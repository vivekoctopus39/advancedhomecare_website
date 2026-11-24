import { Info } from 'lucide-react'
import Reveal from '../common/Reveal'
import SectionHeading from '../common/SectionHeading'
import { EmptyState } from '../common/StateMessage'
import { useContent, useSection } from '../../hooks/useContent'
import { assetUrl } from '../../services/api'

export default function TeamSection() {
  const heading = useSection('home.team')
  const { team = [] } = useContent()

  return (
    <section className="section section--tint team" id="our-team">
      <div className="container">
        <SectionHeading eyebrow={heading.eyebrow} title={heading.title} text={heading.body} />

        {team.length === 0 ? (
          <EmptyState title="Team profiles coming soon" text="Our care team profiles will be added here." />
        ) : (
          <>
            <div className="team__grid">
              {team.map((member, i) => (
                <Reveal as="article" key={member.id} className="team-card" delay={i * 80}>
                  <div className="team-card__media">
                    {member.image && (
                      <img src={assetUrl(member.image)} alt={member.imageAlt} loading="lazy" width="600" height="700" />
                    )}
                  </div>
                  <div className="team-card__body">
                    <h3>{member.role}</h3>
                    <p>{member.text}</p>
                    {member.skills?.length > 0 && (
                      <ul className="tag-list">
                        {member.skills.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            {heading.highlight && team.some((m) => m.isSample) && (
              <p className="sample-note">
                <Info size={15} aria-hidden="true" />
                {heading.highlight}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
