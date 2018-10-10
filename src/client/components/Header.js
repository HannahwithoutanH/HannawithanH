import Router from 'next/router';

export default () => (
  <div>
    <Link href="/">Home</Link>
  </div>
);

function onClickHandler(href) {
  return (e) => {
    e.preventDefault();
    Router.push(href);
  };
}

const Link = ({ children, href }) => (
  <a href="#" onClick={onClickHandler(href)}>
    {children}
    <style jsx>
      {`
      a {
        margin-right: 10px;
      }
    `}

    </style>
  </a>
);
