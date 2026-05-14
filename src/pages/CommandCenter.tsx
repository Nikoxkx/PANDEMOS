import { useStore } from '../store/useStore';
import { diseases, getSeverityColor } from '../data/diseases';
import Card from '../components/Card';
import SeverityBadge from '../components/SeverityBadge';
import Sparkline from '../components/Sparkline';
import Section from '../components/Section';

interface CommandCenterProps {
  onNavigate: (path: string) => void;
}

const liveFeed = [
  { id: 1, time: '3 min ago', disease: 'Mpox', source: 'WHO', tier: 1, headline: 'DRC reports 87 new confirmed cases in North Kivu province', location: 'North Kivu, DRC', cases: 87 },
  { id: 2, time: '12 min ago', disease: 'H5N1', source: 'U.S. CDC', tier: 1, headline: 'Second human case confirmed in Texas dairy farm worker', location: 'Texas, USA', cases: 1 },
  { id: 3, time: '28 min ago', disease: 'COVID-19', source: 'WHO', tier: 1, headline: 'New XEC subvariant detected in 14 countries across Europe', location: 'Europe (multiple)', cases: 0 },
  { id: 4, time: '1 hr ago', disease: 'Cholera', source: 'MSF', tier: 3, headline: 'Water treatment facility damaged in Mozambique flooding exacerbates cholera spread', location: 'Maputo, Mozambique', cases: 234 },
  { id: 5, time: '2 hr ago', disease: 'Mpox', source: 'Africa CDC', tier: 2, headline: 'Clade Ib confirmed in three additional Burundian districts', location: 'Burundi', cases: 45 },
  { id: 6, time: '3 hr ago', disease: 'Marburg', source: 'WHO', tier: 1, headline: 'Contact tracing underway after confirmed case in Dar es Salaam', location: 'Dar es Salaam, Tanzania', cases: 1 },
  { id: 7, time: '5 hr ago', disease: 'H5N1', source: 'ECDC', tier: 1, headline: 'European risk assessment updated following detection in Dutch mink farms', location: 'Netherlands', cases: 0 },
  { id: 8, time: '6 hr ago', disease: 'Ebola', source: 'WHO', tier: 1, headline: 'Uganda declares end of Ebola outbreak after 42 days with no new cases', location: 'Uganda', cases: 0 },
];

const responseTracking = [
  { title: 'WHO PHEIC Declaration', detail: 'Mpox declared a Public Health Emergency of International Concern', date: 'Aug 14, 2024', status: 'Active' },
  { title: 'Travel Restrictions', detail: '12 countries have implemented enhanced screening for Mpox', date: 'Updated Jan 10, 2024', status: 'Active' },
  { title: 'Vaccine Deployment', detail: 'JYNNEOS vaccines shipped to 8 African nations via GAVI partnership', date: 'Jan 8, 2024', status: 'In Progress' },
  { title: 'Emergency Funding', detail: '$75M USD allocated by WHO for Mpox response in Central Africa', date: 'Dec 2023', status: 'Disbursing' },
];

export default function CommandCenter({ onNavigate }: CommandCenterProps) {
  const { darkMode } = useStore();

  const textPrimary = darkMode ? '#F5F5F7' : '#1D1D1F';
  const textSecondary = darkMode ? '#A1A1A6' : '#6E6E73';
  const textTertiary = darkMode ? '#6E6E73' : '#86868B';
  // borderColor available

  const criticalDiseases = diseases.filter(d => d.severity === 'critical' || d.severity === 'elevated');

  return (
    <div className="pt-[52px] min-h-screen" style={{ backgroundColor: darkMode ? '#000' : '#FFF' }}>
      {/* Banner */}
      <div className="text-center py-3" style={{ backgroundColor: darkMode ? '#0A0A0A' : '#F5F5F7' }}>
        <p className="text-[13px]" style={{ color: textTertiary }}>
          Displaying diseases classified as Critical or Elevated threat level
        </p>
      </div>

      {/* Critical Threats */}
      <Section
        label="CRITICAL THREATS"
        heading="Highest priority diseases."
        body="Real-time monitoring of the most significant global health threats."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
          {criticalDiseases.map((disease) => {
            const color = getSeverityColor(disease.severity);
            return (
              <Card
                key={disease.id}
                onClick={() => onNavigate(`/disease/${disease.slug}`)}
              >
                <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ backgroundColor: color }} />
                <div className="text-center">
                  <h3 className="text-[22px] font-semibold" style={{ color: textPrimary }}>{disease.name}</h3>
                  <div className="mt-2">
                    <SeverityBadge severity={disease.severity} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div>
                      <p className="text-[19px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>
                        {disease.totalCases.toLocaleString()}
                      </p>
                      <p className="text-[11px] uppercase tracking-wide mt-0.5" style={{ color: textTertiary }}>Global Cases</p>
                    </div>
                    <div>
                      <p className="text-[19px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>
                        {disease.deaths24h.toLocaleString()}
                      </p>
                      <p className="text-[11px] uppercase tracking-wide mt-0.5" style={{ color: textTertiary }}>Deaths (24h)</p>
                    </div>
                    <div>
                      <p className="text-[19px] font-semibold" style={{ fontFamily: 'monospace', color: disease.growthRate > 0 ? '#FF3B30' : '#34C759' }}>
                        {disease.growthRate > 0 ? '+' : ''}{disease.growthRate}%
                      </p>
                      <p className="text-[11px] uppercase tracking-wide mt-0.5" style={{ color: textTertiary }}>Growth Rate</p>
                    </div>
                    <div>
                      <p className="text-[19px] font-semibold" style={{ fontFamily: 'monospace', color: textPrimary }}>
                        {disease.affectedCountries}
                      </p>
                      <p className="text-[11px] uppercase tracking-wide mt-0.5" style={{ color: textTertiary }}>Countries</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Sparkline data={disease.sparklineData} color={color} width={200} height={40} />
                  </div>

                  <p className="text-[13px] mt-4" style={{ color: disease.growthRate > 0 ? '#FF3B30' : '#34C759' }}>
                    {disease.growthRate > 0 ? '↑' : '↓'} {Math.abs(disease.growthRate)}% change in 7 days
                  </p>

                  <p className="text-[15px] font-medium mt-4" style={{ color: textPrimary }}>
                    View details →
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Live Activity Feed */}
      <Section
        alt
        label="LIVE ACTIVITY"
        heading="Latest reports from critical sources."
        body="Real-time feed of verified intelligence reports from our highest-tier sources."
      >
        <div className="max-w-[800px] mx-auto space-y-4">
          {liveFeed.map((report) => {
            const disease = diseases.find(d => d.name === report.disease);
            const dColor = disease ? getSeverityColor(disease.severity) : '#86868B';
            return (
              <Card key={report.id} hoverable={false}>
                <p className="text-[13px]" style={{ color: textTertiary }}>{report.time}</p>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                  <span
                    className="inline-block text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: `${dColor}15`, color: dColor }}
                  >
                    {report.disease}
                  </span>
                  <span className="text-[12px] inline-flex items-center gap-1" style={{ color: textTertiary }}>
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: report.tier <= 2 ? '#34C759' : '#FF9500' }} />
                    {report.source} · T{report.tier}
                  </span>
                </div>
                <p className="text-[17px] font-medium mt-3 leading-relaxed" style={{ color: textPrimary }}>
                  {report.headline}
                </p>
                <p className="text-[15px] mt-2" style={{ color: textSecondary }}>
                  {report.location}{report.cases > 0 ? ` · ${report.cases.toLocaleString()} cases` : ''}
                </p>
                <button
                  className="text-[13px] mt-3 cursor-pointer border-0 bg-transparent"
                  style={{ color: '#007AFF', fontFamily: 'inherit' }}
                >
                  Read source ↗
                </button>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Response Tracking */}
      <Section
        label="RESPONSE TRACKING"
        heading="Global response measures."
        body="Tracking international health response actions and their current status."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
          {responseTracking.map((item) => (
            <Card key={item.title} hoverable={false}>
              <div className="flex items-start gap-3 justify-center flex-wrap">
                <span
                  className="inline-block text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                  style={{
                    backgroundColor: item.status === 'Active' ? '#007AFF20' : '#FF950020',
                    color: item.status === 'Active' ? '#007AFF' : '#FF9500',
                  }}
                >
                  {item.status}
                </span>
              </div>
              <h4 className="text-[17px] font-semibold mt-3" style={{ color: textPrimary }}>{item.title}</h4>
              <p className="text-[15px] mt-2 leading-relaxed" style={{ color: textSecondary }}>{item.detail}</p>
              <p className="text-[13px] mt-3" style={{ color: textTertiary }}>{item.date}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
