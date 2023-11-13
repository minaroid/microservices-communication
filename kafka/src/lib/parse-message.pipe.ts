import { Injectable, ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { MessageDto } from './message.dto';

@Injectable()
export class ParseMessagePipe implements PipeTransform<any, MessageDto<any>> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(rawMessage: any, metadata: ArgumentMetadata): MessageDto<any> {
    const { message } = rawMessage;
    console.log(JSON.stringify(rawMessage))
    const parsedMessage = new MessageDto<any>({ message });
    return parsedMessage;
  }
}