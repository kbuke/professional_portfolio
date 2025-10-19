export function postEmail(url, information, allEmails, setAllEmails, setSendingEmail, setSentEmail){
    setSendingEmail(true)
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(information)
    })
    .then(r => r.json())
    .then(newAddition => {
        setAllEmails([...allEmails, newAddition]);
        setSentEmail(true);
        setSendingEmail(false)
    });
}