import React, { useEffect, useState } from 'react'
import AppBar from "./AppBar"
import { getInformationOfQuestionary } from '../service/TeacherService'
import CreateQuestionary from './CreateQuestionary'



export default function EditQuestionary(props) {

    const [questionary, setQuestionary] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const informationPromise = getInformationOfQuestionary(props.match.params.hash)
        informationPromise.then((informationResponse) => {
            const information = informationResponse.data
            setQuestionary(information)
            setLoading(false)
        })
    }, [props.match.params.hash])


    return <div>
        <AppBar
            position="static"
        />
        {
            loading ? <div>Obteniendo información</div> : <CreateQuestionary questionary={questionary} history={props.history} asEdit={true} />
        }
    </div>
}