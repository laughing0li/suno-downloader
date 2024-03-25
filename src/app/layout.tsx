import '@/styles/tailwind.css'
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

function RootLayout({
    children
}: Props) {
    return children
}
export default RootLayout;