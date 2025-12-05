import React from "react";

export default function AlunosList({ alunos = [], onRemove }) {
	if (!Array.isArray(alunos)) alunos = [];

	if (alunos.length === 0) {
		return (
			<div style={{ padding: "1rem" }}>
				<p>Nenhum aluno encontrado.</p>
			</div>
		);
	}

	return (
		<div style={{ padding: "1rem" }}>
			<table style={{ width: "100%", borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th style={{ textAlign: "left", padding: "0.5rem" }}>Nome</th>
						<th style={{ textAlign: "left", padding: "0.5rem" }}>CPF</th>
						{onRemove && (
							<th style={{ textAlign: "left", padding: "0.5rem" }}>Ações</th>
						)}
					</tr>
				</thead>
				<tbody>
					{alunos.map((a) => (
						<tr key={a.id}>
							<td style={{ padding: "0.5rem", borderTop: "1px solid #eee" }}>
								{a.nome}
							</td>
							<td style={{ padding: "0.5rem", borderTop: "1px solid #eee" }}>
								{a.cpf || "—"}
							</td>
							{onRemove && (
								<td style={{ padding: "0.5rem", borderTop: "1px solid #eee" }}>
									<button
										type="button"
										onClick={() => onRemove(a)}
										style={{ padding: "0.4rem 0.8rem" }}
									>
										Remover
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

