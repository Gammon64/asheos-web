
const Card = (props: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`${props.className} bg-white dark:bg-black p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800 mb-6`}>
      {props.children}
    </div>
  );
};

export default Card;
