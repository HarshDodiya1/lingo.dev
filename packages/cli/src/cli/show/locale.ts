import { Command } from "commander";
import _ from "lodash";
import Z from 'zod';
import Ora from 'ora';
import { sourceLocales, targetLocales } from "@replexica/spec";

export default new Command()
  .command("locale")
  .description("Print out the list of locales")
  .helpOption("-h, --help", "Show help")
  // argument can be equal either "sources" or "targets"
  .argument('<type>', 'Type of locales to show, either "sources" or "targets"')
  .action(async (type) => {
    const ora = Ora();
    try {
      switch (type) {
        default: throw new Error(`Invalid type: ${type}`);
        case 'sources':
          sourceLocales.forEach((locale) => console.log(locale));
          break;
        case 'targets':
          targetLocales.forEach((locale) => console.log(locale));
          break;
      }
    } catch (error: any) {
      ora.fail(error.message);
      process.exit(1);
    }
  });
