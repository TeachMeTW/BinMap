import React from "react";
import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";

const Bin = () => {
  const {
    state: { filteredBins },
  } = useValue();
  return (
    <Container>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr)) !important",
          // Add custom styles for ImageListItem to maintain aspect ratio
          "& .MuiImageListItem-root": {
            aspectRatio: "1 / 1",
          },
        }}
      >
        {filteredBins.map((bin) => (
          <Card key={bin._id}>
            <ImageListItem sx={{ height: "100% !important" }}>
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
                }}
                title={bin.type.charAt(0).toUpperCase() + bin.type.slice(1)}
                actionIcon={
                  <Tooltip title={bin.uName} sx={{ mr: "5px" }}>
                    <Avatar src={bin.uPhoto} />
                  </Tooltip>
                }
                position="top"
              />
              <img
                src={bin.images[0]}
                alt={bin.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
              <ImageListItemBar title={bin.title} />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Bin;
