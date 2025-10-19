import { useEffect } from "react";


export function DetectSections(){
    useEffect(() => {
        const sections = [
            {name: null, ref: landingRef},
            {name: "Projects", ref: projectRef},
            {name: "Referals", ref: reviewsRef},
            {name: "Contact", ref: contactRef}
        ]
    })

    const observer = new IntersectionObserver(
        entries => {
            const visibleSection = entries.find(entry => entry.isIntersecting)
            if (visibleSection){
                const sectionName = sections.find(
                    s => s.ref.current === visibleSection.target
                )?.name
                setActiveSection(sectionName)
            }
        },
        {threshold: 0.6}
    )

    sections.forEach(s => {
        if(s.ref.current) observer.observe(s.ref.current)
    })
    return () => observer.disconnect()
}