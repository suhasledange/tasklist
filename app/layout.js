import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { TaskProvider } from "@/context/TaskProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskList",
  description: "Finstack Task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
      <TaskProvider>
        <Header/>
        {children}
      </TaskProvider>
        
        </body>
    </html>
  );
}
