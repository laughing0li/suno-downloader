export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 183 48" {...props}>
      <path
        fill="#3B82F6"
        fillRule="evenodd"
        d="M1.172 21.172a4 4 0 000 5.656l20 20a4 4 0 105.656-5.656l-20-20a4 4 0 00-5.656 0z"
        clipRule="evenodd"
      />
      <path
        fill="#93C5FD"
        fillRule="evenodd"
        d="M26.828 6.828a4 4 0 10-5.656-5.656l-19 19A3.987 3.987 0 015 19a3.98 3.98 0 012.827 1.172L10.657 23 26.828 6.828z"
        clipRule="evenodd"
      />
    </svg>
  )
}
