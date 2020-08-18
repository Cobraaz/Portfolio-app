import { useState } from "react";
import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { Row, Col, Button } from "reactstrap";
import { useRouter } from "next/router";
import { useGetUser } from "actions/user";
import PortfolioApi from "lib/api/portfolios";
import PortfolioCard from "components/Portfolio/PortfolioCard";
import { isAuthorized } from "utils/auth0";
import { useDeletePortfolio } from "actions/portfolios";
import {
  CardDeleteButton,
  CardEditButton,
} from "components/shared/CardButtons";
const Portfolios = ({ portfolios: initialPortfolios }) => {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState(initialPortfolios);
  const [deletePortfolio, { data, error }] = useDeletePortfolio();
  const { data: dataU, loading: loadingU } = useGetUser();

  const _deletePortfolio = async (e, portfolioId) => {
    e.stopPropagation();
    const isConfirm = confirm(
      "Are you sure you want to delete this portfolio?"
    );
    if (isConfirm) {
      await deletePortfolio(portfolioId);
      setPortfolios(portfolios.filter((p) => p._id !== portfolioId));
    }
  };

  return (
    <BaseLayout user={dataU} loading={loadingU}>
      <BasePage
        title="Newest Portfolios - Anuj Bansal"
        header="Portfolios"
        className="portfolio-page"
      >
        <Row>
          {portfolios.map((portfolio) => (
            <Col
              key={portfolio._id}
              onClick={() => {
                router.push("/portfolios/[id]", `/portfolios/${portfolio._id}`);
              }}
              lg="4"
              md="6"
            >
              <PortfolioCard portfolio={portfolio}>
                {dataU && isAuthorized(dataU, "admin") && (
                  <>
                    <CardEditButton to={"portfolios"} data={portfolio} />
                    <CardDeleteButton
                      data={portfolio}
                      deleteCard={_deletePortfolio}
                    />
                  </>
                )}
              </PortfolioCard>
            </Col>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

// This function is called during the build time
// Improved performance of page,
// It will create static page with dynamic data
export async function getStaticProps() {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;
  return {
    props: { portfolios },
    revalidate: 1,
  };
}

export default Portfolios;
