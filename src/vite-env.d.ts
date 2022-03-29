/// <reference types="vite/client" />
interface ImportMetaEnv {
  /**
   * 数字化营销 url
   */
  readonly VITE_DIGITAL_MARKETING: string;
  /**
   * 版本背景图
   */
  readonly VITE_PRO_LAYOUT_WATERMARKPROPS: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
