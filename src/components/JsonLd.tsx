/** Renders a schema.org JSON-LD block. Server-safe: no client state. */
export default function JsonLd({ data }: { data: object }) {
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
