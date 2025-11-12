const Modal = (props: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`${props.className} p-8 bg-gray-50 dark:bg-gray-950 shadow-lg rounded-lg w-full max-w-md gap-4`}
    >
      {props.children}
    </div>
  );
};

export default Modal;
