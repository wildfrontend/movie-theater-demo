import { notFound } from 'next/navigation';
import React from 'react';

const Page: React.FC<{
  params: Promise<{ movieId: string }>;
}> = async ({ params }) => {
  const { movieId } = await params;
  try {
    return (
      <div>
        <h1>Movie Detail</h1>
        <p>Movie ID: {movieId}</p>
      </div>
    );
  } catch (error) {
    notFound();
  }
};

export default Page;
