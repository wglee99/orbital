import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import dataList from "../components/data.json";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";

export default function Countries() {
  const history = useHistory();

  const routeChange = () => {
    let path = "/places";
    history.push(path);
  };

  return (
    <div className="Countries">
      <box>
        <h1 style={{ textAlign: "start" }}>
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Countries
          </h3>
        </h1>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <GridList
            cellHeight={160}
            cols={3}
            style={{ width: 800, height: 600 }}
            onClick={routeChange}
          >
            {dataList.data.map((data) => (
              <GridListTile key={data.id}>
                <img src={data.image} alt={data.title} />
                <GridListTileBar
                  title={data.title}
                  style={{ textAlign: "start" }}
                  actionIcon={
                    <IconButton>
                      <InfoIcon style={{ color: "white" }} />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </Box>
      </box>
    </div>
  );
}
