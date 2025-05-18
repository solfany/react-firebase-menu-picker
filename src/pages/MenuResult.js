import PieChart from "../components/charts/PieChart/PieChart";
import BarChart from "../components/charts/BarChart/BarChart";
import FlexSection from "../components/section/FlexSection/FlexSection";
import Section from "../components/section/Section/Section";
import DefaultCard from "../components/card/DefaultCard/DefaultCard";

const MenuResult = () => {
  return (
    <>
      <FlexSection>
        <DefaultCard className="chart-card">
          <PieChart />
        </DefaultCard>
        <DefaultCard className="chart-card">
          <BarChart />
        </DefaultCard>
      </FlexSection>
    </>
  );
};

export default MenuResult;
