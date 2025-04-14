import React from 'react';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import FlexSection from '../components/section/FlexSection';
import Card from '../components/card/Card';

const MenuStats = () => {
    return (
        <>
            <FlexSection>
                <Card className="chart-card">
                    <PieChart />
                </Card>
                <Card className="chart-card">
                    <BarChart />
                </Card>
            </FlexSection>
        </>
    );
};

export default MenuStats;
