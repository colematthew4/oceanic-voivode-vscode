import yaml from 'js-yaml';
import { promises as fs } from 'fs';
import { join } from 'path';

type YamlTheme = {
  presets: Array<String>,
  workbench: Theme
}
type Theme = { [index: string]: ThemeColors }
type ColorTheme = { [index: string]: string | null }
type ThemeColors = {
  dark: string | null,
  light: string | null,
  hc: string | null,
  [index: string]: string | null
}

async function readYaml(theme: String): Promise<YamlTheme> {
  const file = await fs.readFile(join(__dirname, '..', 'theme', `oceanic-voivode-${theme}.yaml`), 'utf8');
  return yaml.load(file) as YamlTheme;
}

async function writeJson(json: Theme, theme: string) {
  await fs.writeFile(join(__dirname, '..', 'theme', 'generated.json'), JSON.stringify({
    '$schema': 'vscode://schemas/color-theme',
    'type': theme,
    'colors': json
  }, null, 2));
}

function build(themes: Array<string>) {
  themes.forEach(async theme => {
    const data: any = await readYaml(theme);
    await writeJson(data.workbench, theme);
  });
};

build(['dark']);
