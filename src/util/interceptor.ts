import { classToPlain, Exclude, ClassTransformOptions } from 'class-transformer'
import { ClassSerializerInterceptor, PlainLiteralObject } from '@nestjs/common'

export class ClassToPlainInterceptor extends ClassSerializerInterceptor {
    serialize(
      response: PlainLiteralObject | Array<PlainLiteralObject>,
      options: ClassTransformOptions,
    ): PlainLiteralObject | PlainLiteralObject[] {
      return classToPlain(response, options)
    }
}
