export default function MusicData(props) {
    return (
        <div>
            <img width="25%" src={props.url} alt="" />
            <h2>{props.name}</h2>
            <h2>{props.album}</h2>
        </div>
    )
}