import { Injectable } from '@nestjs/common'
import {
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import {
  getSignedUrl,
} from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'

@Injectable()
export class StorageService {
  private readonly client: S3Client

  private readonly bucket =
    process.env.R2_BUCKET_NAME!

  private readonly publicUrl =
    process.env.R2_PUBLIC_URL!

  constructor() {
    this.client = new S3Client({
      region: 'auto',

      endpoint:
        `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,

      credentials: {
        accessKeyId:
          process.env.R2_ACCESS_KEY_ID!,

        secretAccessKey:
          process.env.R2_SECRET_ACCESS_KEY!,
      },
    })
  }

  async createUploadUrl(
    folder: 'audio' | 'covers',
    filename: string,
    contentType: string,
  ) {
    const extension =
      filename.split('.').pop() || ''

    const key =
      `${folder}/${randomUUID()}.${extension}`

    const command =
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        ContentType: contentType,
      })

    const uploadUrl =
      await getSignedUrl(
        this.client,
        command,
        {
          expiresIn: 600,
        },
      )

    const publicUrl =
      `${this.publicUrl}/${key}`

    return {
      uploadUrl,
      publicUrl,
      key,
    }
  }
}