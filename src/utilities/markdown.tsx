import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const MarkdownComponent = ({ markdownContents }: any) => {
  const [descriptions, setDescriptions] = useState<string[] | null>([]);
  useEffect(() => {
    setDescriptions(markdownContents);
  }, [markdownContents]);

  return descriptions ? (
    <div>
      {
        descriptions.map((description: string) => <ReactMarkdown children={description} />)
      }
    </div>
  ) : (
    <></>
  );
};