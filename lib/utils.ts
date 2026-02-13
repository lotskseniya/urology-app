import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseFormattedText(text: string, locale?: string) {
    const withLinks = text.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        `<a href="/${locale}$2" class="text-[#911F16] underline hover:text-[#6B2A2A] transition-colors">$1</a>`
    )
    const withBold = withLinks.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#911F16]">$1</strong>')
    const withAsteriskBold = withBold.replace(/\*(.*?)\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    const withBreaks = withAsteriskBold.replace(/<\/br>/g, '<br />')
    const withNewlines = withBreaks.replace(/\n/g, '<br />')
    return withNewlines
}
