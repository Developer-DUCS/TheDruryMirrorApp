
import Link from 'next/link';
import Head from 'next/head'


export default function testingPage() {
    return (
        <h1 className="title">
            Quill Test Page <Link href="/quillTest"></Link>
        </h1>
    );
}