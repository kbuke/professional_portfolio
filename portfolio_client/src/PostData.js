export function postEmail(url, information, allEmails, setAllEmails, setIsLoading, setSentEmail, setSendingEmail){
    setIsLoading(true);
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
        setIsLoading(false);
        setSentEmail(true);
        setSendingEmail(false)
    });
}