declare module 'qrcode' {
  export interface QRCodeToDataURLOptions {
    width?: number
    margin?: number
    color?: { dark?: string; light?: string }
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
    scale?: number
    type?: 'image/png' | 'image/jpeg' | 'image/webp'
    quality?: number
  }
  export function toDataURL(text: string, options?: QRCodeToDataURLOptions): Promise<string>
  const _default: { toDataURL: typeof toDataURL }
  export default _default
}
