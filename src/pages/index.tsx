import { CommmerceService } from "@/models/commerce";
import HomeScreen from "@/screens/Home";
import { HomeLoader } from "@/screens/Home/Home";
import { NextPageContext } from "next";
interface HomeProps {
  commerce: CommmerceService;
}

export default function Home({ commerce }: HomeProps) {
  return <HomeScreen commerce={commerce} />;
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  return HomeLoader(ctx);
};
