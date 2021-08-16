import { StyleSheet, css } from "aphrodite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <>
      <div className={css(styles.header)}>
        <FontAwesomeIcon icon={faStopwatch} className="icon fa-2x" />
        <h1 className={css(styles.title)}>Closing Time</h1>
      </div>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#193753",
    color: "white",
    margin: "auto",
    paddingLeft: "10px",
    paddingBottom: "5px",
  },
  title: {
    paddingLeft: "10px",
    fontFamily: "Quicksand",
    fontSize: 40,
    marginBottom: 0,
  },
});
