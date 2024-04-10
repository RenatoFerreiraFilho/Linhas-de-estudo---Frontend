export default function Error({ children: errorMessage }) {
    return <div className=" bg-red-200 text-red-500">{errorMessage}</div>;
}
