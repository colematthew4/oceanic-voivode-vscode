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

async function readYaml(): Promise<YamlTheme> {
  const file = await fs.readFile(join(__dirname, '..', 'theme', 'oceanic-voivode.yml'), 'utf8');
  return yaml.load(file) as YamlTheme;
}

async function writeJson(json: Theme, theme: string) {
  const data: ColorTheme = {};
  Object.entries(json).forEach(([key, value]) => {
    const color = value != null ? value[theme] : null;
    data[key] = color;
  });
  await fs.writeFile(join(__dirname, '..', 'theme', 'generated.json'), JSON.stringify({
    colors: data
  }, null, 2));
}

async function build(themes: Array<string>) {
  const data: any = await readYaml();
  themes.forEach(async theme => {
    await writeJson(data.workbench, theme);
  });
};

build(['dark']);
