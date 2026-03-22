import { manualHtml } from '../data/manual-content'
export default function ManualPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900">FM250 飛行手冊</h1>
      <div
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 overflow-x-auto prose prose-sm max-w-none
          [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-6 [&_h1]:mb-3
          [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mt-5 [&_h2]:mb-2
          [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-gray-700 [&_h3]:mt-4 [&_h3]:mb-2
          [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-gray-700 [&_p]:my-2
          [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs [&_table]:my-3
          [&_td]:border [&_td]:border-gray-200 [&_td]:px-2 [&_td]:py-1
          [&_th]:border [&_th]:border-gray-200 [&_th]:px-2 [&_th]:py-1 [&_th]:bg-gray-50 [&_th]:font-semibold
          [&_ul]:pl-5 [&_ul]:my-2 [&_ul]:text-sm
          [&_ol]:pl-5 [&_ol]:my-2 [&_ol]:text-sm
          [&_li]:my-1
          [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-3
          [&_strong]:font-semibold [&_strong]:text-gray-900"
        dangerouslySetInnerHTML={{ __html: manualHtml }}
      />
    </div>
  )
}
