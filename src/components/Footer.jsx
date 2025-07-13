function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer
      className={
        document.body.classList.contains("no-favorites")
          ? "footer no-favorite-footer"
          : "footer"
      }
    >
      <p>&#169; {date} Vince Ivan Fontabla</p>
      <p>For Educational purpose only</p>
    </footer>
  );
}

export default Footer;
