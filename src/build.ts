import yaml from 'js-yaml';
import { promises as fs } from 'fs';
import { join } from 'path';
import tinycolor from 'tinycolor2';

type YamlTheme = {
  'color-presets': string[],
  tokens: ColorToken[]
  ui: Theme
}
type Theme = { [index: string]: ColorTheme }
type ColorTheme = string | ColorTheme[] | Color | null
type ColorToken = {
  name: string | undefined
  scope: string | string[]
  foreground: string | Color | null
  fontStyle: FontStyle
  [prop: string]: any
}
type FontStyle =
  "underline" |
  "bold" |
  "bold underline" |
  "italic" |
  "italic bold" |
  "italic underline" |
  "italic bold underline" |
  "" | null | undefined
interface Color {
  color: string | null
  illuminate: number | null
  opacity: number | null
}
interface Token {
  name: string | undefined
  scope: string[]
  settings: {
    foreground: string | null | undefined
    fontStyle: FontStyle
  }
  [prop: string]: any
}

async function readYaml(theme: String): Promise<YamlTheme> {
  const file = await fs.readFile(join(__dirname, '..', 'theme', `oceanic-voivode-${theme}.yaml`), 'utf8');
  return yaml.load(file) as YamlTheme;
}

async function writeJson(json: YamlTheme, theme: string) {
  const data: { [index: string]: string | null | undefined } = {};
  Object.entries(json.ui).forEach(([key, value]) => {
    data[key] = resolveColor(value);
  });
  const tokens: Token[] = json.tokens.map(token => {
    const tokenObj: Token = {
      name: token.name,
      scope: token.scope instanceof Array ? token.scope : [token.scope],
      settings: {
        foreground: resolveColor(token.foreground),
        fontStyle: token.fontStyle
      }
    };

    if (tokenObj.name === undefined) {
      delete tokenObj.name;
    }
    if (tokenObj.settings.foreground == null) {
      delete tokenObj.settings.foreground;
    }
    if (tokenObj.settings.fontStyle === null) {
      tokenObj.settings.fontStyle = '';
    } else if (tokenObj.settings.fontStyle === undefined) {
      delete tokenObj.settings.fontStyle;
    }
    return tokenObj;
  });

  await fs.writeFile(join(__dirname, '..', 'theme', 'oceanic-voivode.json'), JSON.stringify({
    $schema: 'vscode://schemas/color-theme',
    type: theme,
    colors: data,
    tokenColors: tokens,
    semanticHighlighting: true
  }, null, 2));
}

function resolveColor(colorValue: ColorTheme): string | null | undefined {
  let color: string | null | undefined;
  if (colorValue == null)
    return colorValue;

  if (colorValue instanceof Array) {
    let value: ColorTheme | undefined = colorValue.find((c: ColorTheme) => resolveColor(c));
    while (value != null && typeof value != 'string') {
      value = resolveColor(value as ColorTheme);
    }
    color = value;
  } else if (typeof colorValue === 'object') {
    color = colorValue.color
    if (color != null && colorValue.illuminate) {
      const hsl = tinycolor(color).toHsl()
      // use vscode's algorithm vs tinycolor's
      // https://github.com/microsoft/vscode/blob/main/src/vs/base/common/color.ts#L358
      color = tinycolor({ ...hsl, l: hsl.l + hsl.l * colorValue.illuminate }).toHexString();
    }
    if (color != null && colorValue.opacity != null) {
      color = tinycolor(color).setAlpha(colorValue.opacity).toHex8String();
    }
  } else {
    color = colorValue as string;
  }

  return color;
}

['dark'].forEach(async theme => {
  const data: any = await readYaml(theme);
  await writeJson(data, theme);
});
