import style from './Notascard.modules.css'
export function Notascard({ nota }) {
    return (

        <div class="card">
            <div class="container">
                <h4><b>{nota.title}</b></h4>
                <p>{nota.content}</p>
            </div>
        </div>

    )
}

