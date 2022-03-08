import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import wines from "./assets/wines_admin.json";
import { createUseStyles } from "react-jss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const useStyles = createUseStyles({
  searchBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "150px",
    paddingBottom: 20,
    flexDirection: "column",
  },
});

const filterData = [
  { name: "All", value: "all" },
  { name: "Region", value: "region" },
  { name: "Blanc", value: "Blanc" },
  { name: "Rouge", value: "Rouge" },
  { name: " appellation", value: "appellation" },
];

function App() {
  const [wineData, setWineData] = useState();
  const [searchName, setSearchName] = useState();
  const [filterOption, setFilterOption] = useState();
  const classes = useStyles();
  useEffect(() => {
    fetch(
      "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f6673324-9e0d-4071-8a63-c5fadab5efaa/wines_admin.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220308T141956Z&X-Amz-Expires=86400&X-Amz-Signature=aaa4e9204b5fdbb639f28f712f86dc1d5319cc27c0ebcca8a3875fb9127b399a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22wines_data.json%22&x-id=GetObject"
    ).then((res) =>
      res.json().then((data) => {
        filterOption === "all" && setWineData(data.wines);
        if (searchName) {
          const newData = data.wines.filter((item) =>
            item.name.toLowerCase().includes(searchName.toLowerCase())
          );
          setWineData(newData);
          return;
        }
        if (filterOption !== "all") {
          const newData = data.wines.filter(
            (item) => item.type === filterOption
          );
          setWineData(newData);
        }
      })
    );
  }, [searchName, filterOption]);

  return (
    <div>
      <div className={classes.searchBar}>
        <TextField
          label="Search for wines..."
          variant="outlined"
          style={{ width: "25%" }}
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setFilterOption();
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: 20,
          }}
        >
          {filterData.map((data) => (
            <Button
              variant={data.value === filterOption ? "contained" : "outlined"}
              onClick={() => setFilterOption(data.value)}
            >
              {data.name}
            </Button>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {wineData?.map((item, index) => (
          <div
            style={{
              paddingBottom: 20,
            }}
            key={index}
          >
            <Card sx={{ width: 345, height: 500, overflowY: "scroll" }}>
              <CardMedia
                component="img"
                height="240"
                image={item.logo}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                {item.grapeVarieties && (
                  <Typography variant="h6">
                    Grape Varieties: {item.grapeVarieties}
                  </Typography>
                )}
                {item.year && (
                  <Typography variant="h6">Year: {item.year}</Typography>
                )}
                {item.region && (
                  <Typography variant="h6">Region: {item.region}</Typography>
                )}
                {item.agingPotential && (
                  <Typography variant="h6">
                    Aging Potential: {item.agingPotential}
                  </Typography>
                )}
                {item.description && (
                  <Typography variant="h6">
                    Description: {item.description}
                  </Typography>
                )}
                {item.type && (
                  <Typography variant="h6">Type: {item.type}</Typography>
                )}
                {item.cuvee && (
                  <Typography variant="h6">Cuvee: {item.cuvee}</Typography>
                )}
                {item.cru && (
                  <Typography variant="h6">Cru: {item.cru}</Typography>
                )}
                {item.appellation && (
                  <Typography variant="h6">
                    Appellation: {item.appellation}
                  </Typography>
                )}
                {item.appellation && (
                  <Typography variant="h6">
                    Appellation Type: {item.appellationType}
                  </Typography>
                )}
                {item.price && (
                  <Typography variant="h6">Price: {item.price}</Typography>
                )}
                {item.note && (
                  <Typography variant="h6">Note: {item.note}</Typography>
                )}
                {item.winePaired.length > 0 && (
                  <Typography variant="h6">
                    Wine Paired:
                    {item.winePaired.map((dish, index) => (
                      <span key={index}>{`${dish}, `}</span>
                    ))}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
