import React from "react";
import cx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";

import Comments from "./Comments";

export const BlogCardDemo = React.memo(function BlogCard({
  modalContent: book,
}) {
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia className={styles.media} image={book.image} />
      <CardContent>
        <TextInfoContent
          classes={contentStyles}
          overline={book.category}
          heading={book.name}
          body={book.description}
        />
        <Button className={buttonStyles}>borrow</Button>
        <Comments book={book} />
      </CardContent>
    </Card>
  );
});

export default BlogCardDemo;

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: "auto",
    borderRadius: spacing(2), // 16px
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    maxWidth: 1000,
    marginLeft: "auto",
    overflow: "initial",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: spacing(2),
    [breakpoints.up("md")]: {
      flexDirection: "row",
      paddingTop: spacing(2),
    },
  },
  media: {
    width: "88%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: spacing(-3),
    paddingBottom: "48%",
    borderRadius: spacing(2),
    backgroundColor: "#fff",
    position: "relative",
    minWidth: "55vw",
    maxHeight: "40vh",
    [breakpoints.up("md")]: {
      minWidth: "27vw",
      minHeight: "15vh",
      maxHeight: "60vh",

      marginLeft: spacing(-5),
      marginTop: 0,
      transform: "translateX(-8px)",
    },
    "&:after": {
      content: '" "',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: "initial",
  },
}));
