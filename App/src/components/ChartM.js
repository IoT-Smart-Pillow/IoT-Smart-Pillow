import {
  View,
  Text,
  Dimensions
} from "react-native";
import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryBar,
  VictoryGroup,
  VictoryLegend,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory-native";

const Chart = ({ plotData }) => {
  // console.log(Dimensions.get("screen").height);
  return (
    <View>
      
      <VictoryChart
        height={200}
        theme={VictoryTheme.material}
        padding={40}
        containerComponent={
          <VictoryZoomContainer
            minimumZoom={{ x: 100000, y: 1000000000 }}
            allowZoom={true}
            allowPan={true}
          />
        }
        domain={{y: [0.0, 1.2]}}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        style={{ background: { fill: "teal",opacity:0.2 } }}
      >
        <VictoryLine
        width={100}
          style={{
            data: { stroke: "#c43a31",width:100 },
            parent: { border: "1px solid #ccc" },
          }}
          data={plotData}
          scale="linear"
        />
        <VictoryAxis label={"Time"} tickFormat={() => ''} />
        <VictoryAxis dependentAxis tickFormat={() => ''} label={"Motion"}/>
      </VictoryChart>
    </View>
  );
};

export default Chart;
