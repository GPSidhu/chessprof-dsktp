export const data = [
	{
		id: "1",
		title: "Nakhmanson",
		moves: [
			["e4", "e5"],
			["Nf3", "Nc6"],
			["Bc4", "Nf6"],
			["d4", "exd4"],
			["O-O", "Nxe4"],
			["Nc3", "dxc3"],
			["Bxf7", "Kxf7"],
			[
				"Qd5+",
				{
					options: {
						Kg6: [
							["Qxe4+", "Kf7"],
							["Bg5", "!"],
						],
						Kf6: [
							["Re1", "Bd6"],
							[
								"Rxe4",
								// {
								// 	options: {
								// 		Nc5: [["b4", "Bxf3"]],
								// 		Nc6: [["c5", "d8"]],
								// 	},
								// 	msg:
								// 		"This is another conditional inside prev one.",
								// },
							],
						],
						// ke7: [["Qxe4+", "?"], ["Ng5"]],
						Ke8: [["Re1", "!"]],
					},
					msg:
						"There are multiple options to move the King here. Try exploring each of the possibilities and their variations",
				},
				"There are multiple options to move the King here. Try exploring each of the possibilities and their variations",
			],
		],
	},
	{
		id: "2",
		title: "Belgrade Gambit",
		moves: [
			["e4", "e5"],
			["Nf3", "Nc6"],
			["Nc3", "Nf6"],
			["d4", "exd4"],
			["Nd5"],
		],
	},
	{
		id: "3",
		title: "Ponziani Opening",
		moves: [
			["e4", "e5"],
			["Nf3", "Nc6"],
			[
				"c3",
				{
					options: {
						Nf6: [
							[
								"d4",
								{
									options: {
										Nxe4: [
											[
												"d5",
												{
													options: {
														Ne7: [
															[
																"Nxe5",
																{
																	options: {
																		Ng6: [],
																		f6: [],
																		d6: [
																			[
																				"Bb5+",
																				{
																					options: {
																						c6: [
																							[
																								"dxc6",
																								"bxc6",
																							],
																							[
																								{
																									options: {
																										Nxc6: [
																											[
																												null,
																												"Nxc6",
																											],
																											[
																												"Bxc6",
																												"Bd7",
																											],
																											[
																												"Bxa8",
																											],
																										],
																									},
																									msg:
																										"",
																								},
																							],
																						],
																					},
																					msg:
																						"Black can block with night, pawn or bishop",
																				},
																			],
																		],
																	},
																},
															],
														],
														Nb8: [
															[
																"Be3",
																{
																	options: {
																		d6: [
																			[
																				"Qa4+",
																				"Bd7",
																			],
																			[
																				"Qxe4",
																			],
																		],
																		f6: [
																			[
																				"Nxe5",
																				"fxe5",
																			],
																			[
																				"Qh5+",
																				"Ke7",
																			],
																			[
																				"Qxe5+",
																			],
																		],
																		Bd6: [
																			[
																				"Nbd2",
																				"Nxd2",
																			],
																			[
																				"Nxd2",
																				"Bb6",
																			],
																			[
																				"Nc4",
																			],
																		],
																		Qe7: [
																			[
																				"Nbd2",
																				"Qxd2",
																			],
																		],
																	},
																},
															],
														],
													},
												},
											],
										],
										exd4: null,
										d5: null,
									},
								},
							],
						],
						d5: null,
						f5: null,
					},
				},
			],
		],
	},
];
