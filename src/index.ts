import figlet from 'figlet';
import inquirer from 'inquirer';
import { PROMPT_LIST, CUSTOM_TEMPLATE, IPromptOption } from './assets/inquirer';
import { handlePromptMethod } from './handle';
import { createCommand } from './command';

function entry() {
  const result = figlet.textSync('Dapp-cli', {
    font: 'Speed',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  });
  console.log('result...', result);
  
  inquirer.prompt<IPromptOption>(PROMPT_LIST).then(async answer => {
    const { templateName } = answer;
    let params = answer;
    if (templateName === 'custom') {
      const customParam = await inquirer.prompt(CUSTOM_TEMPLATE);
      params = Object.assign(params, customParam);
    }
    handlePromptMethod(params);
  });
}

const cmd = createCommand();
entry();
