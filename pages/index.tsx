import { GetServerSideProps } from 'next';
import { client } from '../src/lib/prismic';
import Prismic from 'prismic-javascript';
import { ParsedUrlQuery } from 'node:querystring';
import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';

interface HomeProps {
  plants: ApiSearchResponse;
}

export default function Home({ plants }: HomeProps) {
  return (
    <div>
      {plants.results.map(({ data }) => { console.log(data) })}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps, ParsedUrlQuery> = async () => {

  const plants = await client().query([
    Prismic.Predicates.at('document.type', 'plant')
  ]);

  return {
    props: {
      plants
    }
  }
}
