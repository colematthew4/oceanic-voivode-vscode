import yaml from 'js-yaml';
import { promises as fs } from 'fs';
import { join } from 'path';
import tinycolor from 'tinycolor2';

type YamlTheme = {
  presets: Array<string>,
  workbench: Theme
}
type Theme = { [index: string]: ColorTheme }
type ColorTheme = string | Array<ColorTheme> | Color | null
interface Color {
  color: string | null
  illuminate: number | null
  opacity: number | null
}

async function readYaml(theme: String): Promise<YamlTheme> {
  const file = await fs.readFile(join(__dirname, '..', 'theme', `oceanic-voivode-${theme}.yaml`), 'utf8');
  return yaml.load(file) as YamlTheme;
}

async function writeJson(json: Theme, theme: string) {
  const data: { [index: string]: string | null | undefined } = {};
  Object.entries(json).forEach(([key, value]) => {
    data[key] = resolveColor(value);
  });

  await fs.writeFile(join(__dirname, '..', 'theme', 'generated.json'), JSON.stringify({
    '$schema': 'vscode://schemas/color-theme',
    'type': theme,
    'colors': data
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
      color = tinycolor({ ...hsl, l: hsl.l + hsl.l * colorValue.illuminate }).toHexString()
    }
    if (color != null && colorValue.opacity) {
      color = tinycolor(color).setAlpha(colorValue.opacity).toHex8String();
    }
  } else {
    color = colorValue as string;
  }

  return color;
}

function build(themes: Array<string>) {
  themes.forEach(async theme => {
    const data: any = await readYaml(theme);
    await writeJson(data.workbench, theme);
  });
};

build(['dark']);
