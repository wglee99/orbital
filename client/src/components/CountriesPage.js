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

  const routeChange = (id) => {

    if (id === 1) {
      history.push({
        pathname: "/places",
        search: 'tokyo',
      });
    } else if (id === 2) {
      history.push({

        pathname: "/places",
        search: 'osaka',
      });
    } else if (id === 3) {
      history.push({
        pathname: "/places",
        search: 'seoul',
      });
    } else if (id === 4) {
      history.push({
        pathname: "/places",
        search: 'busan',
      });
    } else if (id === 5) {
      history.push({
        pathname: "/places",
        search: 'bali',
      });
    } else if (id === 6) {
      history.push({
        pathname: "/places",
        search: 'taipei',
      });
    } else if (id === 7) {
      history.push({
        pathname: "/places",
        search: 'beijing',
      });
    }
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
          >
            {dataList.data.map((data) => (
              <GridListTile key={data.id}>
                <img
                  src={data.image}
                  alt={data.title}
                  onClick={() => {
                    routeChange(data.id);
                  }}
                />

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
