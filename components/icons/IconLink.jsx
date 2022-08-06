export default function IconLink(props) {
    return (
        <a href={props.href || '#'} className="text-base font-medium text-white hover:text-indigo-50">
            {props.children}
        </a>
    );
}
