import qs from 'qs';
import { chatRequest as request } from 'request';

import useEnv from '@/hooks/useEnv';

// eslint-disable-next-line react-hooks/rules-of-hooks
let env = useEnv();
// qa 地址
const search = qs.parse(window.location.search, {
  ignoreQueryPrefix: true,
});

if (search.env) {
  env = search.env;
}

export async function getQiniuToken() {
  const data = await request.get(`/api/medgpt/${env}/qiniu_token`);
  return data;
}

export async function uploadFileToQiniu(data: {
  filename?: string;
  file: File;
  sessionid: string;
  onProgress?(e: { total: number; percent: number }): void;
}): Promise<{ domain: string; key: string; url: string }> {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('sessionid', data.sessionid);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const env = useEnv();
  return request.post(`/api/medgpt/${env}/file_watermark_upload`, formData, {
    onUploadProgress(progressEvent) {
      data.onProgress?.({
        total: progressEvent.total ?? 0,
        percent: Math.floor(
          (progressEvent.loaded / (progressEvent.total ?? 0)) * 100,
        ),
      });
    },
  });
}
