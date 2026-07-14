import { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/ui/Card';
import Field from '../../components/ui/Field';
import Button from '../../components/ui/Button';
import {
  ApiError,
  type CompanyOut,
  type UserOut,
  createCompany,
  listCompanies,
  createEmployee,
  listEmployees,
} from '../../services/api';
import './Companies.css';

export default function Companies() {
  const [companies, setCompanies] = useState<CompanyOut[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [employees, setEmployees] = useState<UserOut[]>([]);

  const [companyName, setCompanyName] = useState('');
  const [companyCnpj, setCompanyCnpj] = useState('');
  const [companyError, setCompanyError] = useState<string | null>(null);
  const [companyLoading, setCompanyLoading] = useState(false);

  const [empName, setEmpName] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empPassword, setEmpPassword] = useState('');
  const [empError, setEmpError] = useState<string | null>(null);
  const [empLoading, setEmpLoading] = useState(false);

  const loadCompanies = async () => {
    const data = await listCompanies();
    setCompanies(data);
    if (data.length && selectedId === null) {
      setSelectedId(data[0].id);
    }
  };

  useEffect(() => {
    loadCompanies().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedId === null) {
      setEmployees([]);
      return;
    }
    listEmployees(selectedId)
      .then(setEmployees)
      .catch(() => setEmployees([]));
  }, [selectedId]);

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyError(null);
    setCompanyLoading(true);
    try {
      const company = await createCompany({ name: companyName, cnpj: companyCnpj });
      setCompanyName('');
      setCompanyCnpj('');
      await loadCompanies();
      setSelectedId(company.id);
    } catch (err) {
      setCompanyError(err instanceof ApiError ? err.message : 'Não foi possível criar a empresa.');
    } finally {
      setCompanyLoading(false);
    }
  };

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId === null) return;
    setEmpError(null);
    setEmpLoading(true);
    try {
      await createEmployee(selectedId, { name: empName, email: empEmail, password: empPassword });
      setEmpName('');
      setEmpEmail('');
      setEmpPassword('');
      const updated = await listEmployees(selectedId);
      setEmployees(updated);
    } catch (err) {
      setEmpError(err instanceof ApiError ? err.message : 'Não foi possível cadastrar o funcionário.');
    } finally {
      setEmpLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="companies">
        <div className="companies__header">
          <div>
            <h1 className="companies__title">Empresas</h1>
            <p className="companies__subtitle">Cadastre empresas e gerencie os funcionários de cada uma.</p>
          </div>
        </div>

        <div className="companies__grid">
          <Card title="Nova empresa" description="Cadastre uma empresa pelo nome e CNPJ.">
            <form className="companies__form" onSubmit={handleCreateCompany}>
              {companyError && <p className="companies__error">{companyError}</p>}
              <Field
                label="Nome da empresa"
                name="name"
                placeholder="Acme Ltda"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
              <Field
                label="CNPJ"
                name="cnpj"
                placeholder="00.000.000/0000-00"
                value={companyCnpj}
                onChange={(e) => setCompanyCnpj(e.target.value)}
                required
              />
              <Button type="submit" disabled={companyLoading}>
                {companyLoading ? 'Cadastrando…' : 'Cadastrar empresa'}
              </Button>
            </form>
          </Card>

          <Card
            title="Empresas cadastradas"
            description={companies.length ? 'Selecione uma empresa para ver os funcionários.' : 'Nenhuma empresa cadastrada ainda.'}
          >
            <ul className="companies__list">
              {companies.map((company) => (
                <li key={company.id}>
                  <button
                    type="button"
                    className={`companies__list-item ${selectedId === company.id ? 'companies__list-item--active' : ''}`}
                    onClick={() => setSelectedId(company.id)}
                  >
                    <span className="companies__list-name">{company.name}</span>
                    <span className="companies__list-cnpj">{company.cnpj}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          {selectedId !== null && (
            <>
              <Card title="Novo funcionário" description="Cadastre um funcionário para a empresa selecionada.">
                <form className="companies__form" onSubmit={handleCreateEmployee}>
                  {empError && <p className="companies__error">{empError}</p>}
                  <Field
                    label="Nome"
                    name="emp-name"
                    placeholder="Nome completo"
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                    required
                  />
                  <Field
                    label="Email"
                    type="email"
                    name="emp-email"
                    placeholder="funcionario@empresa.com"
                    value={empEmail}
                    onChange={(e) => setEmpEmail(e.target.value)}
                    required
                  />
                  <Field
                    label="Senha"
                    type="password"
                    name="emp-password"
                    placeholder="Senha de acesso"
                    value={empPassword}
                    onChange={(e) => setEmpPassword(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={empLoading}>
                    {empLoading ? 'Cadastrando…' : 'Cadastrar funcionário'}
                  </Button>
                </form>
              </Card>

              <Card
                title="Funcionários"
                description={employees.length ? `${employees.length} cadastrado(s)` : 'Nenhum funcionário cadastrado ainda.'}
                className="companies__grid-item--wide"
              >
                <ul className="companies__list">
                  {employees.map((emp) => (
                    <li key={emp.id} className="companies__employee">
                      <span className="companies__list-name">{emp.name}</span>
                      <span className="companies__list-cnpj">{emp.email}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
