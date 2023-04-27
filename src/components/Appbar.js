import Link from "next/link";

export const Appbar = ({ path, token }) => (
  <div className="mt-5 ml-5 mr-5 flex justify-between">
    <div className="flex justify-between bg-white rounded-2xl shadow-md float-left gap-5 py-2 px-3">
      <LinkButton path="/" title="Home" isActive={path == "/"} />
      <LinkButton path="/new" title="New" isActive={path == "/new"} />
      <LinkButton
        path="/requests"
        title="Requests"
        isActive={path == "/requests"}
      />
    </div>
    <div className="flex-1"></div>
    <Link
      href="create-claim"
      className="fact-gradient font-medium text-white px-5 rounded-2xl special-shadow mr-5 flex items-center"
    >
      Create Claim
    </Link>
    <div className="flex justify-between bg-white rounded-2xl shadow-md float-left gap-10 py-2 px-3">
      {!token ? (
        <LinkButton
          path="/login"
          title="Login/Register"
          isActive={path == "/login" || path == "/register"}
        />
      ) : (
        <UserBar></UserBar>
      )}
    </div>
  </div>
);

const LinkButton = ({ title, path, isActive }) => {
  return (
    <Link
      href={path}
      className="py-1 px-2 rounded-xl font-semibold"
      style={{
        backgroundColor: isActive ? "rgb(239, 237, 237)" : "rgba(0,0,0,0)",
        color: isActive ? "black" : "#535353",
      }}
    >
      {title}
    </Link>
  );
};

const UserBar = () => {
  return <></>;
};
