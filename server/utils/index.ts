import moment from 'moment';
import { ChatCompletionRequestMessage } from 'openai';

export const ErrorMessage: { [key: number]: string } = {
  400: 'Dužina vaših tokena konteksta dijaloga je prevelika, smanjite sadržaj pitanja',
  401: 'TIMUR AI KLJUC NIJE UREDU',
  403: 'TIMUR AI SERVER ODBIJA PRISTUP',
  429: 'TIMUR AI SERVERI SU PRETRPANI',
  502: 'Greška mrežnog prolaza, pokušajte ponovo kasnije',
  503: 'Server je zauzet, pokušajte ponovo kasnije',
  504: 'Gateway je istekao, pokušajte ponovo kasnije',
  500: 'TIMUR AI SERVERI SU PRETRPANI',
};

const systemMessages: ChatCompletionRequestMessage[] = [
  { role: 'system', content: '请以markdown的形式返回答案' },
];

function getSystemMessage (): ChatCompletionRequestMessage[] {
  const currentTime: ChatCompletionRequestMessage = { role: 'system', content: `现在的北京时间是: ${moment().format('YYYY-MM-DD HH:mm:ss')} ${moment().format('dddd')}` };
  return [currentTime, ...systemMessages];
}

/**
 * 解析stream流的字符串
 */
function parseStreamText(data: string) {
  const dataList = data?.split('\n')?.filter((l) => l !== '');

  const result = { role: 'assistant', content: '', stop: false };

  dataList.forEach((l) => {
    // 移除"data: "前缀
    const jsonStr = l.replace('data: ', '');

    if (jsonStr === '[DONE]') {
      result.stop = true;
    } else {
      // 将JSON字符串转换为JavaScript对象
      const jsonObj = JSON.parse(jsonStr);
      const delta = jsonObj.choices[0].delta as ChatCompletionRequestMessage;
      if (delta.role) result.role = delta.role;
      else if (delta.content) {
        result.content = `${result.content}${delta.content}`;
      }
    }
  });

  return result;
}

export { getSystemMessage, parseStreamText };
