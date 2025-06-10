    // Auxiliary functions to calculate target center
        const centroAlvoX = (alvo) => alvo.x + 20;
        const centroAlvoY = (alvo) => alvo.y + 20;

        // 1 - Champion Data (Convert cooldowns to MS)
        const towerData = {
            ironman: {
                icon: 'https://static.marvelsnap.pro/art/IronMan_21.webp',
                poder: 'Lasers que carregam o Reator Arc. Com carga máxima, dispara um Unibeam devastador. Pode voar continuamente em órbita do inimigo mais forte, atirando lasers. Se o inimigo for destruído, ele buscará o próximo alvo mais forte, mantendo-se sempre em movimento.',
                custo: 300,
                dano: 12,
                cooldownBase: 25 * (1000 / 60), // frames -> ms for laser shots
                alcance: 160, // Not directly used for orbit, but for laser targeting
                cargaMaxUnibeam: 15,
                danoUnibeam: 150,
                flightCooldownBase: 15000,
                flightOrbitSpeed: 300,
                flightOrbitRadius: 100,
                flightAttackCooldown: 500,
            },
            thor: {
                icon: 'https://i.gifer.com/5N8a.gif',
                poder: 'Invoca raios em cadeia que atingem múltiplos alvos. Arremessa o Mjolnir periodicamente. 33% de chance de atordoar.',
                custo: 200,
                dano: 35,
                alcance: 140,
                cooldownBase: 90 * (1000 / 60),
                danoMjolnir: 120,
                cooldownMjolnirBase: 15000,
                stunChance: 0.33,
                stunDuration: 1500,
            },
            loki: {
                icon: 'https://static.marvelsnap.pro/art/Loki_08.webp',
                poder: 'Astuto e imprevisível. Seus punhais de veneno reduzem a vida inimiga. Invoca ilusões que atraem inimigos, e pode copiar outros campeões ou invocar variações do multiverso.',
                custo: 250,
                danoBasePunhal: 10,
                alcance: 160,
                cooldownBase: 750,

                poisonDaggerChance: 0.75,
                poisonDuration: 7000,
                poisonTickRate: 500,
                poisonDamagePerTick: 8,
                halfHpOnHit: true,

                illusionCooldown: 15000,
                illusionDuration: 5000,
                illusionSpawnCount: [2, 3],
                illusionRadius: 150,

                shapeshiftCooldown: 20000,
                shapeshiftDuration: 10000,

                ultimatePhasesRequired: 2,
                variantSpawnCount: [3, 5],
                variantDuration: 7000,
            },
            redhulk: {
                icon: 'https://wallpapersok.com/images/high/4k-red-hulk-byadx8pxajj15md4.jpg',
                poder: 'Absorve energia de abates para ficar mais forte. Causa explosão térmica. Sua Aura de Fogo causa dano gradual em uma zona.',
                custo: 300,
                danoBase: 30,
                raioBase: 120,
                cooldown: 5000,
                auraCooldown: 20000,
                auraDuration: 5000,
                auraDamagePerTick: 20,
                auraTickRate: 500,
                auraRadius: 70,
            },
            emma: {
                icon: 'https://i0.wp.com/lugarnenhum.net/wp-content/uploads/2023/03/marvel-fan-art-07.webp?fit=650,813&ssl=1',
                poder: 'Telepata que confunde inimigos. Ela age como um radar contínuo, aplicando ilusões que paralisam inimigos com 75% de chance assim que eles entram em sua zona de influência. Na forma diamante, o Impacto de Diamante é ativado automaticamente e lança cacos perfurantes.',
                custo: 400,
                zona: 180,
                cooldownAtaqueBase: 50,
                chanceConfusao: 0.75, // Changed to 0.75 as per the new patch notes
                duracaoConfusao: 120 * (1000 / 60),
                cooldownDiamante: 40000,
                duracaoDiamante: 8000,
                zonaOndaDiamante: 100,
                danoOndaDiamante: 15,
                cooldownOndaDiamante: 60 * (1000 / 60),
                novaCooldown: 5000,
                novaDamage: 30,
                novaShards: 8,
                novaProjectileSpeed: 8,
            },
            ultron: {
                icon: 'https://static.marvelsnap.pro/art/Ultron_12.webp',
                poder: 'Invoca Drones Sentinela para atacar. Pode ativar Drones de Ataque que perseguem e explodem. Lança nuvens de nanobots. Chama disparos orbitais. Se destruído, reconstrói.',
                custo: 250,
                alcance: 0,
                dano: 0,
                cooldownBase: 0,
                spawnCooldownBase: 480 * (1000 / 60),
                maxDrones: 5,
                droneSize: 20,
                droneSpawnRadius: 100,

                droneLaserDamage: 8,
                droneLaserCooldown: 600,
                droneLaserRange: 150,
                droneLaserColor: 'orange',

                kamikazeDroneConvertCount: 3,
                kamikazeDroneCooldown: 10000,
                kamikazeDroneDamage: 80,
                kamikazeDroneExplosionRadius: 70,
                kamikazeDroneSpeed: 10,
                kamikazeDroneColor: 'red',

                nanobotInfestationCooldown: 15000,
                nanobotInfestationDuration: 7000,
                nanobotDamagePerTick: 7,
                nanobotTickRate: 700,
                armorReductionFactor: 0.15,
                nanobotRange: 150,

                satelliteStrikeCooldown: 30000,
                satelliteStrikeDamage: 200,
                satelliteStrikeRadius: 100,
                hackChanceOnDeath: 0.2,

                replicationCoreDuration: 5000,
                maxReplicationsPerPhase: 1,
            },
            captainmarvel: {
                icon: 'https://static.marvelsnap.pro/art/CaptainMarvel_02.webp',
                poder: 'Voo e ataque em qualquer parte do campo (prioriza o mais distante). Absorve energia de abates/explosões próximas para carregar sua Ultimate. Ative "C" para se transformar em um Míssil Humano, causando dano massivo em linha reta e explodindo no alvo.',
                custo: 350,
                dano: 75,
                cooldownBase: 35 * (1000 / 60),
                alcanceMax: 450,
                alcanceMin: 100,

                energyAbsorptionRange: 150,
                energyPerKill: 5,
                energyPerExplosion: 10,
                ultimateChargeNeeded: 100,

                missileCooldown: 45000,
                missileSpeed: 600,
                missileDamage: 300,
                missileAoeDamage: 150,
                missileExplosionRadius: 100,
                missileVisualColor: 'gold',
            },
            gaviaoarqueiro: {
                icon: 'https://i.pinimg.com/236x/4e/20/d9/4e20d9290a3e8831ab0939b05e639d77.jpg',
                poder: 'Atira flechas com diferentes efeitos: Padrão, Explosiva (dano em área), Perfurante (atravessa inimigos), Choque (atordoa), Gelo (congela), Veneno (dano ao longo do tempo), Tripla (três flechas de uma vez).',
                custo: 400,
                danoBase: 20,
                alcance: 900,
                cooldownBase: 750,
                arrowTypes: ['standard', 'explosive', 'piercing', 'shock', 'ice', 'poison', 'triple'],
                arrowProperties: {
                    standard: {
                        dano: 20,
                        vel: 10,
                        raioColisao: 10,
                        color: 'white',
                        width: 2
                    },
                    explosive: {
                        dano: 40,
                        vel: 8,
                        raioColisao: 15,
                        explosionRadius: 60,
                        explosionDamage: 30,
                        color: 'orange',
                        width: 4
                    },
                    piercing: {
                        dano: 25,
                        vel: 12,
                        raioColisao: 10,
                        color: 'cyan',
                        width: 3
                    },
                    shock: {
                        dano: 15,
                        vel: 11,
                        raioColisao: 10,
                        color: 'yellow',
                        width: 2,
                        stunDuration: 1000
                    },
                    ice: {
                        dano: 35,
                        vel: 9,
                        raioColisao: 12,
                        color: 'lightblue',
                        width: 3,
                        stunDuration: 3000
                    },
                    poison: {
                        dano: 10,
                        vel: 10,
                        raioColisao: 10,
                        color: 'lime',
                        width: 2,
                        poisonDuration: 5000,
                        poisonTickRate: 500,
                        poisonDamagePerTick: 3
                    },
                    triple: {
                        dano: 18,
                        vel: 10,
                        raioColisao: 8,
                        color: 'white',
                        width: 2
                    }
                },
            },
            usagent: {
                icon: 'https://static.marvelsnap.pro/art/USAgent_07.webp',
                poder: 'Dispara um projétil de energia negra. Pode realizar uma Investida Tática que avança, derruba e danifica inimigos, com chance de atordoá-los. Ele também pode usar um Chamado à Luta que aumenta o dano e a velocidade de ataque dos aliados no campo.',
                custo: 320,
                dano: 25,
                alcance: 180,
                cooldownBase: 40 * (1000 / 60),

                chargeCooldown: 15000,
                chargeDamage: 60,
                chargeSpeed: 300,
                chargeKnockback: 40,
                chargeStunChance: 0.5,
                chargeStunDuration: 700,
                chargeProjectileSize: 8,
                chargeProjectileColor: 'black',
                chargeRadius: 50,

                combatCallCooldown: 40000,
                combatCallBuffDuration: 10000,
                combatCallDamageBuff: 0.3,
                combatCallSpeedBuff: 0.3,
            },
            captainamerica: {
                icon: 'https://static.marvelsnap.pro/art/CaptainAmerica_05.webp',
                poder: 'Lança seu escudo que ricocheteia entre inimigos. Pode emitir um Grito de Combate que inspira aliados e desmoraliza inimigos.',
                custo: 350,
                dano: 25,
                alcance: 200,
                cooldownBase: 45 * (1000 / 60),
                ricochetMaxBounces: 2,
                ricochetDamageReduction: 0.2,
                ricochetChainRadius: 100,

                defensiveStanceCooldown: 20000,
                defensiveStanceDuration: 5000,
                damageReductionFactor: 0.3,
                reflectDamageChance: 0.2,
                reflectDamageMultiplier: 0.5,
            },
            wanda: {
                icon: 'https://static.marvelsnap.pro/art/ScarletWitch_01.webp',
                poder: 'Controla a realidade. Cria ilusões que confundem inimigos, e manipula a Zona do Caos e Runas de Bloqueio. Pode ressuscitar aliados temporariamente.',
                custo: 450,
                dano: 0,
                alcance: 200,
                cooldownBase: 1000,
                illusionConfuseDuration: 1500,
                illusionDamage: 10,
                illusionEffectRadius: 50,
                illusionChance: 0.1,

                hexZonaCooldown: 20000,
                hexZonaDuration: 5000,
                hexZonaRadius: 150,
                hexZonaStunChance: 0.5,
                hexZonaConfuseChance: 0.5,

                runeCooldown: 25000,
                runeDuration: 8000,
                runeRadius: 100,
                runeDebuffPreventChance: 1.0,
                runeCleanseExisting: true,

                reviveCooldown: 1000,
                reviveDuration: 10000,
                reviveDamageBuff: 0.5,
                reviveSpeedBuff: 0.2,
                maxRevivesPerPhase: 1,
            },
            noturno: { // Nightcrawler
                icon: 'https://p2.trrsf.com.br/image/fget/cf/540/960/smart/images.terra.com/2024/05/10/card-2-noturno-x-men-legends-ii-sobs7rjdhpb8.jpg',
                poder: 'Mestre do teletransporte e combate ágil. Pode executar a "Dança Noturna" (Beyblade) que causa dano em área, te tornando invulnerável. Também pode criar "Pontos de Ancoragem" para teletransporte rápido pelo mapa.',
                custo: 380,
                dano: 0, // No direct base attack, abilities do damage
                cooldownBase: 0, // No standard attack cooldown

                // Night Dance "Beyblade" (Active - Key 'Z')
                danceCooldown: 12000, // 12 seconds cooldown
                danceDuration: 3000, // 3 seconds active
                danceRadius: 80, // Area of effect for damage/knockback
                danceDamagePerTick: 25, // Damage per tick
                danceTickRate: 200, // Every 0.2 seconds
                danceKnockbackAmount: 15, // Pixels to push back
                bleedChance: 0.25, // 25% chance to apply bleed
                bleedDuration: 3000, // 3 seconds bleed
                bleedDamagePerTick: 5, // 5 damage per tick
                disarmChance: 0.15, // 15% chance to disarm
                disarmDuration: 2000, // 2 seconds disarm

                // Anchor Point (Active - Key 'X')
                teleportCooldown: 5000, // 5 seconds cooldown
            },
        };

        // 2 - Canvas and Context
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions responsively
        function resizeCanvas() {
            const container = document.getElementById('canvasContainer');
            if (container) {
                // Not used with the current fixed canvas dimensions, but kept for responsiveness
            }
        }

        // 3 - Images
        const imagensTorres = {};
        for (const tipo in towerData) {
            imagensTorres[tipo] = new Image();
            imagensTorres[tipo].src = towerData[tipo].icon;
            imagensTorres[tipo].onerror = () => {
                console.error(`Error loading image for: ${tipo} with URL: ${towerData[tipo].icon}`);
                imagensTorres[tipo].src = `https://placehold.co/50x50/cccccc/000000?text=${tipo.substring(0, 1).toUpperCase()}`;
            };
        }
        const doombotImg = new Image();
        doombotImg.src = 'https://static.marvelsnap.pro/art/DoomBot2099.webp';
        doombotImg.onerror = () => { doombotImg.src = 'https://placehold.co/40x40/ff0000/ffffff?text=X'; };

        const droneImg = new Image();
        droneImg.src = 'https://static.marvelsnap.pro/art/Drone.webp';
        droneImg.onerror = () => { droneImg.src = 'https://placehold.co/40x40/00ff00/ffffff?text=D'; };

        const mjolnirImg = new Image();
        mjolnirImg.src = 'https://static.marvelsnap.pro/art/Mjolnir.webp';
        mjolnirImg.onerror = () => { mjolnirImg.src = 'https://placehold.co/40x40/0000ff/ffffff?text=M'; };

        const capShieldImg = new Image();
        capShieldImg.src = 'https://www.geekworldcascavel.com.br/image/cachewebp/catalog/produtos/escudos/captainamericashield-1000x1000.webp';
        capShieldImg.onerror = () => { capShieldImg.src = 'https://placehold.co/40x40/0000ff/ffffff?text=S'; };

        const usagentShieldImg = new Image();
        usagentShieldImg.src = 'https://yoshstudios.com/wp-content/uploads/2025/05/Render_4-1.png';
        usagentShieldImg.onerror = () => { usagentShieldImg.src = 'https://placehold.co/40x40/0000ff/ffffff?text=US'; };

        const wandaIllusionImg = new Image();
        wandaIllusionImg.src = 'https://www.freeiconspng.com/uploads/purple-smoke-png-4.png';
        wandaIllusionImg.onerror = () => { wandaIllusionImg.src = 'https://placehold.co/40x40/ff00ff/ffffff?text=W'; };

        // 4 - Game Arrays and Variables
        const drones = [];
        const torres = [];
        let inimigos = [];
        let destroyedTowers = [];
        let efeitosVisuais = [];
        let projetis = [];
        const dummyTowers = [];
        const lokiVariantDrones = [];
        let vida = 999999999;
        let dinheiro = 10000000;
        let fase = 1;
        let inimigosDerrotados = 0;
        let pausado = false;
        let dragging = null;
        let torreSelecionada = null;
        let lastFrameTime = 0;
        let resurrectionsUsedThisPhase = 0;

        // 5 - Event Listeners
        document.addEventListener('keydown', e => {
            if (e.key.toLowerCase() === 'p') {
                pausado = !pausado;
                const pausadoMsgElement = document.getElementById('pausadoMsg');
                if (pausadoMsgElement) {
                    pausadoMsgElement.style.display = pausado ? 'block' : 'none';
                }
            }
            if (e.key.toLowerCase() === 'd') {
                if (torreSelecionada && torreSelecionada.tipo === 'emma' && torreSelecionada.cooldownDiamanteAtual <= 0) {
                    torreSelecionada.modo = 'diamante';
                    torreSelecionada.timerModo = towerData.emma.duracaoDiamante;
                    torreSelecionada.cooldownDiamanteAtual = towerData.emma.cooldownDiamante;
                    efeitosVisuais.push({
                        tipo: 'explosaoEmma', x: torreSelecionada.x, y: torreSelecionada.y, raio: towerData.emma.zonaOndaDiamante,
                        inicio: Date.now(), duracao: 400,
                    });
                }
            }
            if (e.key.toLowerCase() === 'f') {
                if (torreSelecionada && torreSelecionada.tipo === 'redhulk') {
                    const dados = towerData.redhulk;
                    if (torreSelecionada.auraCooldownCurrent <= 0) {
                        torreSelecionada.isAuraActive = true;
                        torreSelecionada.auraTimer = dados.auraDuration;
                        torreSelecionada.auraCooldownCurrent = dados.auraCooldown;
                        torreSelecionada.lastAuraTickTime = Date.now();
                        console.log('Red Hulk ativou Aura de Fogo!');
                    } else {
                        mostrarMsg('Aura de Fogo em recarga!');
                    }
                }
            }
            if (e.key.toLowerCase() === 'q') {
                if (torreSelecionada && torreSelecionada.tipo === 'usagent') {
                    const dados = towerData.usagent;
                    if (torreSelecionada.chargeCooldownCurrent <= 0) {
                        torreSelecionada.chargeCooldownCurrent = dados.chargeCooldown;

                        let targetEnemy = null;
                        let furthestX = -1;
                        inimigos.forEach(e => {
                            if (e.x > furthestX) {
                                furthestX = e.x;
                                targetEnemy = e;
                            }
                        });

                        if (targetEnemy) {
                            torreSelecionada.isCharging = true;
                            torreSelecionada.chargeStartX = torreSelecionada.x;
                            torreSelecionada.chargeStartY = torreSelecionada.y;
                            torreSelecionada.chargeTargetX = centroAlvoX(targetEnemy);
                            torreSelecionada.chargeTargetY = centroAlvoY(targetEnemy);
                            const distance = Math.hypot(torreSelecionada.chargeTargetX - torreSelecionada.chargeStartX, torreSelecionada.chargeTargetY - torreSelecionada.chargeStartY);
                            torreSelecionada.chargeDuration = (distance / dados.chargeSpeed) * 1000;
                            torreSelecionada.chargeElapsedTime = 0;
                            console.log('USAgent ativou Investida Tática!');
                        } else {
                            mostrarMsg('USAgent: Nenhum inimigo para investir!');
                        }
                    } else {
                        mostrarMsg('Investida Tática em recarga!');
                    }
                }
            }
            if (e.key.toLowerCase() === 'e') {
                if (torreSelecionada && torreSelecionada.tipo === 'captainamerica') {
                    const dados = towerData.captainamerica;
                    if (torreSelecionada.defensiveStanceCooldownCurrent <= 0) {
                        torreSelecionada.isDefensiveStanceActive = true;
                        torreSelecionada.defensiveStanceTimer = dados.defensiveStanceDuration;
                        torreSelecionada.defensiveStanceCooldownCurrent = dados.defensiveStanceCooldown;
                        console.log('Capitão América ativou Postura Defensiva!');
                    } else {
                        mostrarMsg('Postura Defensiva em recarga!');
                    }
                }
            }
            if (e.key.toLowerCase() === 'u') {
                if (torreSelecionada && torreSelecionada.tipo === 'usagent') {
                    const dados = towerData.usagent;
                    if (torreSelecionada.combatCallCooldownCurrent <= 0) {
                        torreSelecionada.combatCallCooldownCurrent = dados.combatCallCooldown;
                        torreSelecionada.isCombatCallActive = true;
                        torreSelecionada.combatCallBuffEndTime = Date.now() + dados.combatCallBuffDuration;

                        torres.forEach(ally => {
                            if (ally.id !== torreSelecionada.id) {
                                ally.tempDamageBuff = dados.combatCallDamageBuff;
                                ally.tempAttackSpeedBuff = dados.combatCallSpeedBuff;
                                ally.tempBuffEndTime = torreSelecionada.combatCallBuffEndTime;

                                efeitosVisuais.push({
                                    tipo: 'textPop',
                                    x: ally.x,
                                    y: ally.y - 30,
                                    text: `+Dano/+Velocidade!`,
                                    color: 'gold',
                                    duracao: 1500,
                                    inicio: Date.now()
                                });
                            }
                        });
                        efeitosVisuais.push({ tipo: 'usagentCombatCall', x: torreSelecionada.x, y: torreSelecionada.y, raio: 150, inicio: Date.now(), duracao: 800 });
                        console.log('USAgent ativou Chamado à Luta!');
                    } else {
                        mostrarMsg('Chamado à Luta em recarga!');
                    }
                }
            }
            if (e.key.toLowerCase() === 'h') {
                if (torreSelecionada && torreSelecionada.tipo === 'wanda') {
                    const dados = towerData.wanda;
                    if (torreSelecionada.hexZonaCooldownCurrent <= 0) {
                        torreSelecionada.hexZonaCooldownCurrent = dados.hexZonaCooldown;
                        torreSelecionada.isHexZonaActive = true;
                        torreSelecionada.hexZonaEndTime = Date.now() + dados.hexZonaDuration;

                        inimigos.forEach(inimigo => {
                            const dist = Math.hypot(torreSelecionada.x - centroAlvoX(inimigo), torreSelecionada.y - centroAlvoY(inimigo));
                            if (dist < dados.hexZonaRadius) {
                                if (Math.random() < dados.hexZonaStunChance && !(inimigo.isDebuffImmune && inimigo.debuffImmuneEndTime > Date.now())) {
                                    inimigo.isStunned = true;
                                    inimigo.stunTimer = dados.hexZonaDuration;
                                    efeitosVisuais.push({ tipo: 'stunEffect', x: centroAlvoX(inimigo), y: centroAlvoY(inimigo), duracao: dados.hexZonaDuration, inicio: Date.now() });
                                } else if (!(inimigo.isDebuffImmune && inimigo.debuffImmuneEndTime > Date.now())) {
                                    inimigo.isConfuso = true;
                                    inimigo.timerConfusao = dados.hexZonaDuration;
                                    efeitosVisuais.push({ tipo: 'psi', x: centroAlvoX(inimigo), y: centroAlvoY(inimigo), duracao: dados.hexZonaDuration, inicio: Date.now() });
                                }
                            }
                        });
                        efeitosVisuais.push({ tipo: 'hexZonaVisual', x: torreSelecionada.x, y: torreSelecionada.y, raio: dados.hexZonaRadius, inicio: Date.now(), duracao: dados.hexZonaDuration });
                        console.log('Wanda ativou Zona do Caos!');
                    } else {
                        mostrarMsg('Zona do Caos em recarga!');
                    }
                }
            }
            if (e.key.toLowerCase() === 'r') {
                if (torreSelecionada && torreSelecionada.tipo === 'wanda') {
                    const dados = towerData.wanda;
                    if (torreSelecionada.runeCooldownCurrent <= 0) {
                        torreSelecionada.runeCooldownCurrent = dados.runeCooldown;
                        torreSelecionada.isRuneActive = true;
                        torreSelecionada.runeEndTime = Date.now() + dados.runeDuration;

                        efeitosVisuais.push({ tipo: 'runeVisual', x: torreSelecionada.x, y: torreSelecionada.y, raio: dados.runeRadius, inicio: Date.now(), duracao: dados.runeDuration });
                        console.log('Wanda ativou Runa de Bloqueio!');
                    } else {
                        mostrarMsg('Runa de Bloqueio em recarga!');
                    }
                }
            }
            if (e.key.toLowerCase() === 't') {
                if (torreSelecionada && torreSelecionada.tipo === 'wanda') {
                    const dados = towerData.wanda;
                    if (resurrectionsUsedThisPhase < dados.maxRevivesPerPhase && destroyedTowers.length > 0) {
                        const towerToReviveIndex = Math.floor(Math.random() * destroyedTowers.length);
                        const towerToRevive = destroyedTowers[towerToReviveIndex];

                        torres.push(towerToRevive);
                        destroyedTowers.splice(towerToReviveIndex, 1);

                        towerToRevive.isDestroyed = false;
                        towerToRevive.revivedTimer = dados.reviveDuration;
                        towerToRevive.tempDamageBuff = dados.reviveDamageBuff;
                        towerToRevive.tempAttackSpeedBuff = dados.reviveSpeedBuff;
                        towerToRevive.tempBuffEndTime = Date.now() + dados.reviveDuration;

                        efeitosVisuais.push({
                            tipo: 'reviveVisual',
                            x: towerToRevive.x,
                            y: towerToRevive.y,
                            duracao: dados.reviveDuration,
                            inicio: Date.now()
                        });
                        efeitosVisuais.push({
                            tipo: 'textPop',
                            x: towerToRevive.x,
                            y: towerToRevive.y - 30,
                            text: `Revivido!`,
                            color: 'lightblue',
                            duracao: 1500,
                            inicio: Date.now()
                        });
                        resurrectionsUsedThisPhase++;
                        console.log('Wanda ativou Ressurreição Temporária!');
                    } else if (resurrectionsUsedThisPhase >= dados.maxRevivesPerPhase) {
                        mostrarMsg('Limite de ressurreições nesta fase atingido!');
                    } else {
                        mostrarMsg('Nenhuma torre destruída para reviver!');
                    }
                }
            }
            if (e.key.toLowerCase() === 'i') {
                if (torreSelecionada && torreSelecionada.tipo === 'loki') {
                    const dados = towerData.loki;
                    if (torreSelecionada.illusionCooldownCurrent <= 0) {
                        torreSelecionada.illusionCooldownCurrent = dados.illusionCooldown;
                        torreSelecionada.isIllusionActive = true;
                        torreSelecionada.illusionEndTime = Date.now() + dados.illusionDuration;

                        const numIllusions = Math.floor(Math.random() * (dados.illusionSpawnCount[1] - dados.illusionSpawnCount[0] + 1)) + dados.illusionSpawnCount[0];
                        for (let k = 0; k < numIllusions; k++) {
                            const dummyX = torreSelecionada.x + (Math.random() * 200 - 100);
                            const dummyY = torreSelecionada.y + (Math.random() * 200 - 100);
                            dummyTowers.push({
                                id: Date.now() + Math.random(),
                                x: dummyX,
                                y: dummyY,
                                type: 'dummy',
                                spawnTime: Date.now(),
                                lifetime: dados.illusionDuration,
                                image: imagensTorres.loki
                            });
                        }
                        console.log(`Loki ativou Ilusão Perfeita, gerou ${numIllusions} ilusões!`);
                    } else {
                        mostrarMsg('Ilusão Perfeita em recarga!');
                    }
                }
            }
            if (e.key.toLowerCase() === 's') {
                if (torreSelecionada && torreSelecionada.tipo === 'loki') {
                    const dadosLoki = towerData.loki;
                    if (torreSelecionada.shapeshiftCooldownCurrent <= 0) {
                        const otherTowers = torres.filter(t => t.id !== torreSelecionada.id);
                        if (otherTowers.length > 0) {
                            const copiedTower = otherTowers[Math.floor(Math.random() * otherTowers.length)];
                            const copiedTowerData = towerData[copiedTower.tipo];

                            torreSelecionada.shapeshiftCooldownCurrent = dadosLoki.shapeshiftCooldown;
                            torreSelecionada.isShapeshiftActive = true;
                            torreSelecionada.shapeshiftEndTime = Date.now() + dadosLoki.shapeshiftDuration;
                            torreSelecionada.copiedTowerType = copiedTower.tipo;

                            torreSelecionada.copiedDamage = copiedTowerData.dano || copiedTowerData.danoBasePunhal;
                            torreSelecionada.copiedCooldown = copiedTowerData.cooldownBase;

                            if (copiedTower.tipo === 'thor') {
                                torreSelecionada.copiedStunChance = copiedTowerData.stunChance;
                                torreSelecionada.copiedStunDuration = copiedTowerData.stunDuration;
                            } else {
                                torreSelecionada.copiedStunChance = 0;
                                torreSelecionada.copiedStunDuration = 0;
                            }

                            console.log(`Loki transformou-se em ${copiedTower.tipo}!`);
                            efeitosVisuais.push({ tipo: 'textPop', x: torreSelecionada.x, y: torreSelecionada.y - 30, text: `+${copiedTower.tipo.toUpperCase()}!`, color: 'lightgreen', duracao: 1500, inicio: Date.now() });
                        } else {
                            mostrarMsg('Loki precisa de outros campeões para copiar!');
                        }
                    } else {
                        mostrarMsg('Forma Serpenteante em recarga!');
                    }
                }
            }
            if (e.key.toLowerCase() === 'm') {
                if (torreSelecionada && torreSelecionada.tipo === 'loki') {
                    const dados = towerData.loki;
                    const phasesPassed = fase - (torreSelecionada.lastUltimatePhase || 0);
                    if (phasesPassed >= dados.ultimatePhasesRequired) {
                        torreSelecionada.lastUltimatePhase = fase;
                        torreSelecionada.variantCooldownCurrent = 10000;
                        console.log('Loki ativou Invasão Multiversal!');

                        const numVariants = Math.floor(Math.random() * (dados.variantSpawnCount[1] - dados.variantSpawnCount[0] + 1)) + dados.variantSpawnCount[0];
                        for (let k = 0; k < numVariants; k++) {
                            const variantX = Math.random() * canvas.width;
                            const variantY = Math.random() * canvas.height;
                            lokiVariantDrones.push({
                                id: Date.now() + Math.random(),
                                x: variantX,
                                y: variantY,
                                lifetime: dados.variantDuration,
                                spawnTime: Date.now(),
                                damage: 10 + Math.random() * 20,
                                effectType: Math.random() < 0.3 ? 'slow' : (Math.random() < 0.6 ? 'stun' : 'none'),
                                effectValue: Math.random() * 0.2 + 0.1,
                                targetEnemy: null,
                                cooldown: 0,
                                image: imagensTorres.loki
                            });
                        }
                    } else {
                        mostrarMsg(`Invasão Multiversal: Faltam ${dados.ultimatePhasesRequired - phasesPassed} fases.`);
                    }
                }
            }
            if (e.key.toLowerCase() === 'v') {
                if (torreSelecionada && torreSelecionada.tipo === 'ultron') {
                    const dados = towerData.ultron;
                    if (torreSelecionada.kamikazeDroneCooldownCurrent <= 0) {
                        const sentinelDrones = drones.filter(d => d.spawnerId === torreSelecionada.id && d.mode === 'sentinel');
                        if (sentinelDrones.length === 0) {
                            mostrarMsg('Ultron: Não há drones sentinela para converter!');
                            return;
                        }

                        let convertedCount = 0;
                        const dronesToConvert = [];
                        sentinelDrones.sort((a, b) => a.spawnTime - b.spawnTime);

                        for (const drone of sentinelDrones) {
                            if (convertedCount >= dados.kamikazeDroneConvertCount) break;

                            let targetEnemy = null;
                            let furthestX = -1;
                            inimigos.forEach(e => {
                                if (e.x > furthestX) {
                                    furthestX = e.x;
                                    targetEnemy = e;
                                }
                            });

                            if (targetEnemy) {
                                drone.mode = 'kamikaze';
                                drone.target = targetEnemy;
                                drone.damage = dados.kamikazeDroneDamage;
                                drone.explosionRadius = dados.kamikazeDroneExplosionRadius;
                                drone.speed = dados.kamikazeDroneSpeed;
                                drone.radiusCollision = dados.droneSize / 2;
                                dronesToConvert.push(drone);
                                convertedCount++;
                                console.log('Ultron: Drone Sentinela convertido para Kamikaze!');
                            }
                        }

                        if (convertedCount > 0) {
                            torreSelecionada.kamikazeDroneCooldownCurrent = dados.kamikazeDroneCooldown;
                            console.log(`Ultron ativou Drone de Ataque! ${convertedCount} drones convertidos.`);
                        } else {
                            mostrarMsg('Ultron: Nenhum inimigo válido para os drones atacarem!');
                        }
                    } else {
                        mostrarMsg('Drone de Ataque em recarga!');
                    }
                }
            }
            if (e.key.toLowerCase() === 'c') { // Captain Marvel changed from 'x' to 'c'
                if (torreSelecionada && torreSelecionada.tipo === 'captainmarvel') {
                    const dados = towerData.captainmarvel;
                    if (torreSelecionada.missileCooldownCurrent <= 0 && torreSelecionada.absorbedEnergy >= dados.ultimateChargeNeeded) {
                        let targetEnemy = null;
                        let highestHp = -1;
                        let furthestX = -1;
                        inimigos.forEach(e => {
                            if (e.hp > highestHp || (e.hp === highestHp && e.x > furthestX)) {
                                highestHp = e.hp;
                                furthestX = e.x;
                                targetEnemy = e;
                            }
                        });

                        if (targetEnemy) {
                            torreSelecionada.missileCooldownCurrent = dados.missileCooldown;
                            torreSelecionada.absorbedEnergy = 0;
                            torreSelecionada.isHumanMissileActive = true;
                            torreSelecionada.humanMissileTarget = targetEnemy;
                            torreSelecionada.missileStartX = torreSelecionada.x;
                            torreSelecionada.missileStartY = torreSelecionada.y;
                            torreSelecionada.damageApplied = false;

                            const distToTarget = Math.hypot(centroAlvoX(targetEnemy) - torreSelecionada.missileStartX, centroAlvoY(targetEnemy) - torreSelecionada.missileStartY);
                            torreSelecionada.missileDuration = (distToTarget / dados.missileSpeed) * 1000;
                            if (torreSelecionada.missileDuration === 0) torreSelecionada.missileDuration = 1;

                            torreSelecionada.missileElapsedTime = 0;
                            console.log('Captain Marvel ativou Míssil Humano!');
                        } else {
                            mostrarMsg('Captain Marvel: Nenhum inimigo forte para atacar com o míssil!');
                        }
                    } else if (torreSelecionada.missileCooldownCurrent > 0) {
                        mostrarMsg('Míssil Humano em recarga!');
                    } else {
                        mostrarMsg(`Míssil Humano precisa de ${dados.ultimateChargeNeeded - torreSelecionada.absorbedEnergy.toFixed(0)} de energia!`);
                    }
                }
            }
            // Nightcrawler: Night Dance (Z)
            if (e.key.toLowerCase() === 'z') {
                if (torreSelecionada && torreSelecionada.tipo === 'noturno') {
                    const dados = towerData.noturno;
                    if (torreSelecionada.danceCooldownCurrent <= 0) {
                        torreSelecionada.isDancing = true;
                        torreSelecionada.danceTimer = dados.danceDuration;
                        torreSelecionada.danceCooldownCurrent = dados.danceCooldown;
                        torreSelecionada.lastDanceTickTime = Date.now();
                        console.log('Noturno ativou Dança Noturna!');
                        efeitosVisuais.push({
                            tipo: 'bamf',
                            x: torreSelecionada.x,
                            y: torreSelecionada.y,
                            color: 'blue',
                            duracao: 300,
                            inicio: Date.now()
                        });
                    } else {
                        mostrarMsg('Dança Noturna em recarga!');
                    }
                }
            }
            // Nightcrawler: Anchor Point (X)
            if (e.key.toLowerCase() === 'x') {
                if (torreSelecionada && torreSelecionada.tipo === 'noturno') {
                    const dados = towerData.noturno;
                    if (torreSelecionada.teleportCooldownCurrent <= 0) {
                        if (!torreSelecionada.anchor1) { // Place first anchor
                            torreSelecionada.anchor1 = { x: torreSelecionada.x, y: torreSelecionada.y };
                            mostrarMsg('Ponto de Ancoragem 1 definido!');
                            efeitosVisuais.push({
                                tipo: 'bamf',
                                x: torreSelecionada.x,
                                y: torreSelecionada.y,
                                color: 'purple',
                                duracao: 300,
                                inicio: Date.now()
                            });
                        } else if (!torreSelecionada.anchor2) { // Place second anchor
                            torreSelecionada.anchor2 = { x: torreSelecionada.x, y: torreSelecionada.y };
                            mostrarMsg('Ponto de Ancoragem 2 definido!');
                            efeitosVisuais.push({
                                tipo: 'bamf',
                                x: torreSelecionada.x,
                                y: torreSelecionada.y,
                                color: 'purple',
                                duracao: 300,
                                inicio: Date.now()
                            });
                        } else { // Teleport between existing anchors
                            let targetX, targetY;
                            // Check if Nightcrawler is currently at anchor1 (or close enough)
                            if (Math.abs(torreSelecionada.x - torreSelecionada.anchor1.x) < 5 && Math.abs(torreSelecionada.y - torreSelecionada.anchor1.y) < 5) {
                                // Currently at anchor1, go to anchor2
                                targetX = torreSelecionada.anchor2.x;
                                targetY = torreSelecionada.anchor2.y;
                            } else {
                                // Assume currently at anchor2 or somewhere else, go to anchor1
                                targetX = torreSelecionada.anchor1.x;
                                targetY = torreSelecionada.anchor1.y;
                            }

                            efeitosVisuais.push({
                                tipo: 'bamf',
                                x: torreSelecionada.x,
                                y: torreSelecionada.y,
                                color: 'purple',
                                duracao: 300,
                                inicio: Date.now()
                            });
                            torreSelecionada.x = targetX;
                            torreSelecionada.y = targetY;
                            efeitosVisuais.push({
                                tipo: 'bamf',
                                x: torreSelecionada.x,
                                y: torreSelecionada.y,
                                color: 'purple',
                                duracao: 300,
                                inicio: Date.now()
                            });
                            torreSelecionada.teleportCooldownCurrent = dados.teleportCooldown;
                            console.log('Noturno teletransportou!');
                        }
                    } else {
                        mostrarMsg('Ponto de Ancoragem em recarga!');
                    }
                }
            }
        });

        canvas.addEventListener('click', (e) => {
            if (pausado) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            let selecionouAlguma = false;
            for (const torre of torres) {
                const dist = Math.hypot(x - torre.x, y - torre.y);
                if (dist < 25) {
                    torreSelecionada = torre;
                    selecionouAlguma = true;
                    console.log('Torre selecionada:', torre.tipo);
                    return;
                }
            }
            if (!selecionouAlguma) {
                torreSelecionada = null;
            }
        });

        function criarMenu() {
            const menu = document.getElementById('menu');
            if (!menu) {
                console.warn("Elemento 'menu' não encontrado. O menu das torres não será criado.");
                return;
            }
            menu.innerHTML = '';
            for (const [tipo, dados] of Object.entries(towerData)) {
                const img = document.createElement('img');
                img.src = dados.icon;
                img.className = 'torreIcone';
                img.draggable = true;
                img.title = `Campeão: ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}\nCusto: $${dados.custo}\nPoder: ${dados.poder}`;
                img.dataset.tipo = tipo;
                img.addEventListener('dragstart', (e) => {
                    dragging = tipo;
                    document.querySelectorAll('.torreIcone').forEach(icon => icon.classList.remove('selected'));
                    img.classList.add('selected');
                });
                menu.appendChild(img);
            }
        }

        canvas.ondragover = e => e.preventDefault();
        canvas.ondrop = e => {
            e.preventDefault();
            if (dragging && dinheiro >= towerData[dragging].custo) {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const novaTorre = { x, y, tipo: dragging, cooldown: 0, id: Date.now() + Math.random() };

                if (dragging === 'redhulk') {
                    novaTorre.killCount = 0; novaTorre.level = 1; novaTorre.danoAtual = towerData.redhulk.danoBase; novaTorre.raioAtual = towerData.redhulk.raioBase; novaTorre.ultimoPoder = 0;
                    novaTorre.isAuraActive = false;
                    novaTorre.auraTimer = 0;
                    novaTorre.auraCooldownCurrent = 0;
                    novaTorre.lastAuraTickTime = 0;
                } else if (dragging === 'emma') {
                    novaTorre.modo = 'psiquico'; novaTorre.cooldownDiamanteAtual = 0; novaTorre.timerModo = 0; novaTorre.cooldownOndaAtual = 0;
                    novaTorre.novaCooldownCurrent = 0;
                } else if (dragging === 'ironman') {
                    novaTorre.unibeamCharge = 0;
                    novaTorre.unibeamCooldownAtual = 0;
                    novaTorre.flightCooldown = 0;
                    novaTorre.isFlying = false;
                    novaTorre.flightTarget = null;
                    novaTorre.flightOrbitAngle = 0;
                    novaTorre.flightAttackCooldownCurrent = 0;
                    novaTorre.originalX = x;
                    novaTorre.originalY = y;
                } else if (dragging === 'thor') {
                    novaTorre.mjolnirCooldown = 0;
                } else if (dragging === 'ultron') {
                    novaTorre.spawnCooldown = 0;
                    novaTorre.kamikazeDroneCooldownCurrent = 0;
                    novaTorre.nanobotInfestationCooldownCurrent = 0;
                    novaTorre.nanobotInfestationTarget = null;
                    novaTorre.nanobotInfestationEndTime = 0;
                    novaTorre.lastNanobotTickTime = 0;
                    novaTorre.satelliteStrikeCooldownCurrent = 0;
                    novaTorre.emergencyReplicationUsedThisPhase = false;
                    novaTorre.isReconstructing = false;
                    novaTorre.reconstructionEndTime = 0;
                } else if (dragging === 'captainmarvel') {
                    novaTorre.absorbedEnergy = 0;
                    novaTorre.missileCooldownCurrent = 0;
                    novaTorre.isHumanMissileActive = false;
                    novaTorre.humanMissileTarget = null;
                    novaTorre.missileStartX = 0;
                    novaTorre.missileStartY = 0;
                    novaTorre.originalX = x;
                    novaTorre.originalY = y;
                    novaTorre.missileElapsedTime = 0;
                    novaTorre.missileDuration = 0;
                    novaTorre.damageApplied = false;
                }
                else if (dragging === 'gaviaoarqueiro') {
                    novaTorre.currentArrowIndex = 0;
                } else if (dragging === 'loki') {
                    novaTorre.illusionCooldownCurrent = 0;
                    novaTorre.isIllusionActive = false;
                    novaTorre.illusionEndTime = 0;
                    novaTorre.shapeshiftCooldownCurrent = 0;
                    novaTorre.isShapeshiftActive = false;
                    novaTorre.shapeshiftEndTime = 0;
                    novaTorre.copiedTowerType = null;
                    novaTorre.copiedDamage = 0;
                    novaTorre.copiedCooldown = 0;
                    novaTorre.copiedStunChance = 0;
                    novaTorre.copiedStunDuration = 0;
                    novaTorre.ultimatePhasesUsed = 0;
                    novaTorre.lastUltimatePhase = fase;
                    novaTorre.variantCooldownCurrent = 0;
                } else if (dragging === 'usagent') {
                    novaTorre.chargeCooldownCurrent = 0;
                    novaTorre.isCharging = false;
                    novaTorre.chargeTargetX = 0;
                    novaTorre.chargeTargetY = 0;
                    novaTorre.chargeStartX = 0;
                    novaTorre.chargeStartY = 0;
                    novaTorre.chargeElapsedTime = 0;
                    novaTorre.combatCallCooldownCurrent = 0;
                    novaTorre.isCombatCallActive = false;
                    novaTorre.combatCallBuffEndTime = 0;
                } else if (dragging === 'captainamerica') {
                    novaTorre.combatCryCooldownCurrent = 0;
                    novaTorre.tempAttackSpeedBuff = 0;
                    novaTorre.tempBuffEndTime = 0;
                    novaTorre.isDefensiveStanceActive = false;
                    novaTorre.defensiveStanceTimer = 0;
                    novaTorre.defensiveStanceCooldownCurrent = 0;
                } else if (dragging === 'wanda') {
                    novaTorre.hexZonaCooldownCurrent = 0;
                    novaTorre.runeCooldownCurrent = 0;
                    novaTorre.isHexZonaActive = false;
                    novaTorre.hexZonaEndTime = 0;
                    novaTorre.isRuneActive = false;
                    novaTorre.runeEndTime = 0;
                    novaTorre.revivedTimer = 0;
                } else if (dragging === 'noturno') {
                    novaTorre.isDancing = false;
                    novaTorre.danceTimer = 0;
                    novaTorre.danceCooldownCurrent = 0;
                    novaTorre.lastDanceTickTime = 0;
                    novaTorre.anchor1 = null;
                    novaTorre.anchor2 = null;
                    novaTorre.teleportCooldownCurrent = 0;
                }

                torres.push(novaTorre);
                const dinheiroElement = document.getElementById('dinheiro');
                if (dinheiroElement) {
                    dinheiro -= towerData[dragging].custo;
                    dinheiroElement.textContent = dinheiro;
                }
                dragging = null;
                document.querySelectorAll('.torreIcone').forEach(icon => icon.classList.remove('selected'));
            } else if (dragging) {
                mostrarMsg('Dinheiro insuficiente para recrutar este Campeão!');
                dragging = null;
            }
        };

        // --- DRAWING FUNCTIONS ---
        function desenharTorres() {
            torres.forEach(torre => {
                if (torre.isDestroyed) return;
                if (torre.tipo === 'ultron' && torre.isReconstructing) return;

                const img = imagensTorres[torre.tipo];
                let displayImg = img;
                if (torre.tipo === 'loki' && torre.isShapeshiftActive && torre.copiedTowerType && imagensTorres[torre.copiedTowerType] && imagensTorres[torre.copiedTowerType].complete) {
                    displayImg = imagensTorres[torre.copiedTowerType];
                }

                // Captain Marvel Human Missile drawing
                if (torre.tipo === 'captainmarvel' && torre.isHumanMissileActive) {
                    ctx.save();
                    ctx.translate(torre.x, torre.y);
                    const targetX = centroAlvoX(torre.humanMissileTarget);
                    const targetY = centroAlvoY(torre.humanMissileTarget);
                    ctx.rotate(Math.atan2(targetY - torre.y, targetX - torre.x));

                    const pulse = Math.sin(Date.now() / 30) * 2 + 5;
                    const innerRadius = 15 + pulse;
                    const outerRadius = 25 + pulse;

                    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, outerRadius);
                    gradient.addColorStop(0, `rgba(255, 255, 0, 0.9)`);
                    gradient.addColorStop(0.5, `rgba(255, 165, 0, 0.7)`);
                    gradient.addColorStop(1, `rgba(255, 0, 0, 0)`);

                    ctx.beginPath();
                    ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.shadowColor = 'gold';
                    ctx.shadowBlur = 30;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.moveTo(-innerRadius, 0);
                    ctx.lineTo(-innerRadius - 20, -10);
                    ctx.lineTo(-innerRadius - 20, 10);
                    ctx.closePath();
                    ctx.fillStyle = `rgba(255, 220, 0, ${0.7 - (pulse / 10)})`;
                    ctx.fill();

                    ctx.restore();
                    return;
                }

                if (displayImg && displayImg.complete) {
                    ctx.save();
                    if (torre.revivedTimer && torre.revivedTimer > 0) {
                        ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 100) * 0.1;
                    }

                    if (torre === torreSelecionada) {
                        ctx.shadowColor = "cyan"; ctx.shadowBlur = 20;
                        ctx.strokeStyle = "white"; ctx.lineWidth = 2;
                        ctx.strokeRect(torre.x - 27, torre.y - 27, 54, 54);
                    }

                    // Captain America defensive stance visual
                    if (torre.tipo === 'captainamerica' && torre.isDefensiveStanceActive && capShieldImg.complete) {
                        ctx.globalAlpha = 0.3 + Math.sin(Date.now() / 150) * 0.1;
                        const visualRadius = towerData.captainamerica.ricochetChainRadius;
                        ctx.beginPath();
                        ctx.arc(torre.x, torre.y, visualRadius, 0, Math.PI * 2);
                        ctx.clip();
                        ctx.drawImage(capShieldImg, torre.x - visualRadius, torre.y - visualRadius, visualRadius * 2, visualRadius * 2);
                        ctx.restore();
                        ctx.save();
                    }
                    // USAgent Combat Call visual
                    if (torre.tipo === 'usagent' && torre.isCombatCallActive && usagentShieldImg.complete) {
                        ctx.globalAlpha = 0.3 + Math.sin(Date.now() / 150) * 0.1;
                        const visualRadius = towerData.usagent.combatCallRadius || 150;
                        ctx.beginPath();
                        ctx.arc(torre.x, torre.y, visualRadius, 0, Math.PI * 2);
                        ctx.clip();
                        ctx.drawImage(usagentShieldImg, torre.x - visualRadius, torre.y - visualRadius, visualRadius * 2, visualRadius * 2);
                        ctx.restore();
                        ctx.save();
                    }
                    // Wanda Hex Zona Visual
                    if (torre.tipo === 'wanda' && torre.isHexZonaActive && torre.hexZonaEndTime > Date.now()) {
                        ctx.globalAlpha = 0.2 + Math.sin(Date.now() / 100) * 0.1;
                        ctx.beginPath();
                        ctx.arc(torre.x, torre.y, towerData.wanda.hexZonaRadius, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(128, 0, 128, 0.4)';
                        ctx.fill();
                        ctx.strokeStyle = 'rgba(128, 0, 128, 0.8)';
                        ctx.lineWidth = 3;
                        ctx.stroke();
                        ctx.restore(); ctx.save();
                    }
                    // Wanda Rune of Blocking Visual
                    if (torre.tipo === 'wanda' && torre.isRuneActive && torre.runeEndTime > Date.now()) {
                        ctx.globalAlpha = 0.4 + Math.sin(Date.now() / 80) * 0.1;
                        ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)';
                        ctx.lineWidth = 4;
                        ctx.beginPath();
                        const outerRadius = towerData.wanda.runeRadius;
                        const innerRadius = outerRadius * 0.6;
                        const numPoints = 5;
                        for (let i = 0; i < numPoints * 2; i++) {
                            const radius = (i % 2 == 0) ? outerRadius : innerRadius;
                            const angle = Math.PI / numPoints * i;
                            const x = torre.x + Math.cos(angle) * radius;
                            const y = torre.y + Math.sin(angle) * radius;
                            if (i === 0) ctx.moveTo(x, y);
                            else ctx.lineTo(x, y);
                        }
                        ctx.closePath();
                        ctx.stroke();
                        ctx.restore(); ctx.save();
                    }

                    if (torre.tipo === 'thor' || torre.tipo === 'wanda' || torre.tipo === 'loki' || torre.tipo === 'captainmarvel' || torre.tipo === 'ironman' || torre.tipo === 'usagent' || torre.tipo === 'captainamerica') {
                        const range = torre.tipo === 'captainamerica' ? towerData.captainamerica.ricochetChainRadius : towerData[torre.tipo].alcance;
                        if (range > 0) {
                            ctx.beginPath();
                            ctx.arc(torre.x, torre.y, range, 0, Math.PI * 2);
                            ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        }
                    } else if (torre.tipo === 'emma') {
                        const range = torre.modo === 'psiquico' ? towerData.emma.zona : towerData.emma.zonaOndaDiamante;
                        ctx.beginPath();
                        ctx.arc(torre.x, torre.y, range, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(255, 105, 180, 0.3)`;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    } else if (torre.tipo === 'ultron') {
                        ctx.beginPath();
                        ctx.arc(torre.x, torre.y, towerData.ultron.droneSpawnRadius, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(0, 255, 0, 0.3)`;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    } else if (torre.tipo === 'redhulk') {
                        ctx.beginPath();
                        ctx.arc(torre.x, torre.y, torre.raioAtual, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(255, 0, 0, 0.3)`;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    } else if (torre.tipo === 'gaviaoarqueiro') {
                        ctx.beginPath();
                        ctx.arc(torre.x, torre.y, towerData.gaviaoarqueiro.alcance, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(100, 100, 255, 0.2)`;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    } else if (torre.tipo === 'noturno') { // Noturno range visual
                        ctx.beginPath();
                        ctx.arc(torre.x, torre.y, towerData.noturno.danceRadius, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(0, 0, 255, 0.3)`; // Blue for Noturno
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }

                    // Iron Man Unibeam progress bar
                    if (torre.tipo === 'ironman') {
                        const chargeRatio = torre.unibeamCharge / towerData.ironman.cargaMaxUnibeam;
                        ctx.beginPath();
                        ctx.arc(torre.x, torre.y, 20 + chargeRatio * 10, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(0, 191, 255, ${0.1 + chargeRatio * 0.3})`;
                        ctx.fill();
                        if (chargeRatio >= 1) {
                            ctx.shadowColor = "rgb(0,220,255)"; ctx.shadowBlur = 25;
                        }

                        const barWidth = 40;
                        const barHeight = 7;
                        ctx.fillStyle = '#222';
                        ctx.fillRect(torre.x - barWidth / 2, torre.y + 30, barWidth, barHeight);
                        ctx.fillStyle = '#00BFFF';
                        ctx.fillRect(torre.x - barWidth / 2, torre.y + 30, barWidth * chargeRatio, barHeight);
                        ctx.strokeStyle = '#555';
                        ctx.lineWidth = 1;
                        ctx.strokeRect(torre.x - barWidth / 2, torre.y + 30, barWidth, barHeight);
                    }

                    // Red Hulk Aura of Fire visual
                    if (torre.tipo === 'redhulk' && torre.isAuraActive) {
                        const dadosRedHulk = towerData.redhulk;
                        const pulse = Math.sin(Date.now() / 100) * 5 + 10;
                        const currentRadius = dadosRedHulk.auraRadius + pulse;

                        const grad = ctx.createRadialGradient(torre.x, torre.y, 0, torre.x, torre.y, currentRadius);
                        grad.addColorStop(0, `rgba(255, 200, 0, ${0.6 + (pulse / 20)})`);
                        grad.addColorStop(0.5, `rgba(255, 100, 0, ${0.4 + (pulse / 30)})`);
                        grad.addColorStop(1, `rgba(255, 0, 0, ${0.2 * (1 - (pulse / 20))})`);
                        
                        ctx.beginPath();
                        ctx.arc(torre.x, torre.y, currentRadius, 0, Math.PI * 2);
                        ctx.fillStyle = grad;
                        ctx.shadowColor = `rgba(255, 150, 0, 0.8)`;
                        ctx.shadowBlur = 25;
                        ctx.fill();
                    }

                    // Captain Marvel energy absorption bar
                    if (torre.tipo === 'captainmarvel') {
                        const capData = towerData.captainmarvel;
                        const barWidth = 40;
                        const barHeight = 7;
                        const chargeRatio = torre.absorbedEnergy / capData.ultimateChargeNeeded;
                        ctx.fillStyle = '#222';
                        ctx.fillRect(torre.x - barWidth / 2, torre.y + 30, barWidth, barHeight);
                        ctx.fillStyle = 'gold';
                        ctx.fillRect(torre.x - barWidth / 2, torre.y + 30, barWidth * chargeRatio, barHeight);
                        ctx.strokeStyle = '#555';
                        ctx.lineWidth = 1;
                        ctx.strokeRect(torre.x - barWidth / 2, torre.y + 30, barWidth, barHeight);
                    }

                    // Nightcrawler Dance visual
                    if (torre.tipo === 'noturno' && torre.isDancing) {
                        ctx.save();
                        ctx.translate(torre.x, torre.y);
                        const rotationSpeed = Date.now() / 50; // Fast spin
                        ctx.rotate(rotationSpeed);

                        // Draw blurred trails for the swords
                        ctx.lineWidth = 8;
                        ctx.lineCap = 'round';
                        ctx.strokeStyle = `rgba(150, 200, 255, 0.6)`; // Light blue trail
                        ctx.beginPath();
                        ctx.moveTo(-20, -5);
                        ctx.lineTo(20, 5);
                        ctx.stroke();

                        ctx.strokeStyle = `rgba(150, 200, 255, 0.6)`; // Light blue trail
                        ctx.beginPath();
                        ctx.moveTo(-20, 5);
                        ctx.lineTo(20, -5);
                        ctx.stroke();

                        ctx.restore();
                    }

                    ctx.drawImage(displayImg, torre.x - 25, torre.y - 25, 50, 50);

                    // Emma Diamond mode effect
                    if (torre.tipo === 'emma' && torre.modo === 'diamante') {
                        ctx.fillStyle = 'rgba(173, 216, 230, 0.4)';
                        ctx.beginPath();
                        ctx.arc(torre.x, torre.y, 30, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    // Nightcrawler Anchor Point visual
                    if (torre.tipo === 'noturno') {
                        if (torre.anchor1) {
                            ctx.fillStyle = 'rgba(128, 0, 128, 0.5)'; // Purple anchor
                            ctx.beginPath();
                            ctx.arc(torre.anchor1.x, torre.anchor1.y, 10, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = 'purple';
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        }
                        if (torre.anchor2) {
                            ctx.fillStyle = 'rgba(128, 0, 128, 0.5)';
                            ctx.beginPath();
                            ctx.arc(torre.anchor2.x, torre.anchor2.y, 10, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = 'purple';
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        }
                    }

                    ctx.restore();
                } else if (displayImg && !displayImg.complete) {
                    ctx.fillStyle = 'rgba(100,100,100,0.5)';
                    ctx.fillRect(torre.x - 25, torre.y - 25, 50, 50);
                    ctx.fillStyle = 'white'; ctx.textAlign = 'center';
                    ctx.fillText('L...', torre.x, torre.y + 5);
                    ctx.textAlign = 'start';
                }
            });
        }

        function desenharDummyTowers() {
            dummyTowers.forEach(dummy => {
                const img = dummy.image;
                if (img && img.complete) {
                    ctx.save();
                    ctx.globalAlpha = 0.4 + Math.sin(Date.now() / 100) * 0.1;
                    ctx.drawImage(img, dummy.x - 25, dummy.y - 25, 50, 50);
                    ctx.restore();
                }
            });
        }

        function desenharLokiVariantDrones() {
            lokiVariantDrones.forEach(variant => {
                const img = variant.image;
                if (img && img.complete) {
                    ctx.save();
                    ctx.globalAlpha = 0.6 + Math.sin(Date.now() / 80) * 0.1;
                    ctx.drawImage(img, variant.x - 20, variant.y - 20, 40, 40);
                    ctx.restore();
                }
            });
        }

        function desenharDrones() {
            drones.forEach(drone => {
                if (drone.mode === 'sentinel' && droneImg.complete) {
                    ctx.drawImage(droneImg, drone.x - 20, drone.y - 20, 40, 40);
                    const hoverOffset = Math.sin(Date.now() / 200) * 2;
                    ctx.save();
                    ctx.translate(drone.x, drone.y + hoverOffset);
                    ctx.fillStyle = 'rgba(0, 200, 0, 0.3)';
                    ctx.beginPath();
                    ctx.arc(0, 0, 25, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                } else if (drone.mode === 'kamikaze') {
                    ctx.save();
                    ctx.translate(drone.x, drone.y);
                    ctx.rotate(Math.atan2(drone.target.y - drone.y, drone.target.x - drone.x));
                    ctx.beginPath();
                    ctx.arc(0, 0, 8, 0, Math.PI * 2);
                    ctx.fillStyle = drone.color || 'red';
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    const glowPulse = Math.sin(Date.now() / 50) * 3 + 5;
                    ctx.shadowColor = `rgba(255, 0, 0, 0.7)`;
                    ctx.shadowBlur = glowPulse;
                    ctx.arc(0, 0, 10, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
                    ctx.fill();
                    ctx.restore();
                }
            });
        }

        function desenharInimigos() {
            if (!inimigos || !Array.isArray(inimigos)) {
                console.error("inimigos não é um array válido. Não é possível desenhar os inimigos.");
                return;
            }

            inimigos.forEach(inimigo => {
                if (typeof inimigo.x === 'undefined' || typeof inimigo.y === 'undefined') {
                    console.warn("Objeto inimigo malformado, ignorando desenho:", inimigo);
                    return;
                }

                if (doombotImg.complete) {
                    ctx.drawImage(doombotImg, inimigo.x, inimigo.y, 40, 40);
                }
                // Draw health bar
                ctx.fillStyle = 'red';
                ctx.fillRect(inimigo.x, inimigo.y - 10, 40, 5);
                ctx.fillStyle = 'lime';
                const healthBarWidth = (inimigo.hp / inimigo.maxHp) * 40;
                ctx.fillRect(inimigo.x, inimigo.y - 10, healthBarWidth, 5);

                if (inimigo.isConfuso) {
                    ctx.fillStyle = 'white'; ctx.font = 'bold 24px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('?', inimigo.x + 20, inimigo.y - 5);
                    ctx.textAlign = 'start';
                }
                if (inimigo.isStunned) {
                    ctx.fillStyle = 'yellow';
                    ctx.font = 'bold 20px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('⚡', inimigo.x + 20, inimigo.y - 20);
                    ctx.textAlign = 'start';
                }
                if (inimigo.isPoisoned) {
                    ctx.fillStyle = 'lime';
                    ctx.font = 'bold 20px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('🤢', inimigo.x + 20, inimigo.y - 50);
                    ctx.textAlign = 'start';
                }
                if (inimigo.isSlowed) {
                    ctx.fillStyle = 'purple';
                    ctx.font = 'bold 20px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('🐌', inimigo.x + 20, inimigo.y - 40);
                    ctx.textAlign = 'start';
                }
                if (inimigo.isDebuffImmune && inimigo.debuffImmuneEndTime > Date.now()) {
                    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                    ctx.font = 'bold 16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('🛡️', inimigo.x + 20, inimigo.y - 20);
                    ctx.textAlign = 'start';
                }
                if (inimigo.isInfested) {
                    ctx.fillStyle = 'gray';
                    ctx.font = 'bold 20px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('🦠', inimigo.x + 20, inimigo.y - 60);
                    ctx.textAlign = 'start';
                }
                if (inimigo.isHacked) {
                    ctx.fillStyle = 'cyan';
                    ctx.font = 'bold 18px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('💻', inimigo.x + 20, inimigo.y - 70);
                    ctx.textAlign = 'start';
                }
                // Bleeding visual
                if (inimigo.isBleeding) {
                    ctx.fillStyle = 'darkred';
                    ctx.font = 'bold 20px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('🩸', inimigo.x + 20, inimigo.y - 30);
                    ctx.textAlign = 'start';
                }
                // Disarmed visual
                if (inimigo.isDisarmed) {
                    ctx.fillStyle = 'lightgray';
                    ctx.font = 'bold 20px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('🚫⚔️', inimigo.x + 20, inimigo.y - 80);
                    ctx.textAlign = 'start';
                }
            });
        }

        function desenharProjeteis() {
            projetis.forEach(p => {
                if (p.tipo === 'mjolnir' && mjolnirImg.complete) {
                    ctx.save();
                    ctx.translate(p.x, p.y); ctx.rotate(p.rotacao);
                    ctx.drawImage(mjolnirImg, -20, -20, 40, 40);
                    ctx.restore();
                } else if (p.tipo === 'diamondShard') {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotacao);

                    const size = 15;
                    ctx.beginPath();
                    ctx.moveTo(0, -size / 2);
                    ctx.lineTo(size / 2, 0);
                    ctx.lineTo(0, size / 2);
                    ctx.lineTo(-size / 2, 0);
                    ctx.closePath();

                    ctx.fillStyle = 'rgba(173, 216, 230, 0.8)';
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.lineWidth = 1;
                    ctx.shadowColor = `rgba(173, 216, 230, 0.7)`;
                    ctx.shadowBlur = 5;

                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();
                } else if (p.tipo.startsWith('hawkeyeArrow_')) {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(Math.atan2(p.ty - p.y, p.tx - p.x));

                    ctx.beginPath();
                    ctx.moveTo(-15, 0);
                    ctx.lineTo(15, 0);
                    ctx.lineTo(10, -5);
                    ctx.moveTo(15, 0);
                    ctx.lineTo(10, 5);
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = p.width;
                    ctx.lineCap = 'round';
                    ctx.stroke();

                    if (p.tipo === 'hawkeyeArrow_explosive') {
                        const glowRadius = Math.sin(Date.now() / 50) * 3 + 7;
                        ctx.beginPath();
                        ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${p.color === 'orange' ? '255,165,0' : '255,255,0'}, 0.5)`;
                        ctx.fill();
                    } else if (p.tipo === 'hawkeyeArrow_shock') {
                        const zzzSize = 5 + Math.sin(Date.now() / 70) * 3;
                        ctx.fillStyle = 'yellow';
                        ctx.font = `${zzzSize}px Arial`;
                        ctx.textAlign = 'center';
                        ctx.fillText('zzz', 0, -15);
                        ctx.textAlign = 'start';
                    } else if (p.tipo === 'hawkeyeArrow_ice') {
                        ctx.beginPath();
                        ctx.moveTo(15, 0);
                        ctx.lineTo(15 + Math.sin(Date.now() / 60) * 3, -5);
                        ctx.lineTo(15 + Math.sin(Date.now() / 60) * 3, 5);
                        ctx.fillStyle = 'white';
                        ctx.fill();
                    } else if (p.tipo === 'hawkeyeArrow_poison') {
                        ctx.beginPath();
                        ctx.arc(-10, 0, 3, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(-5, -5, 2, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
                        ctx.fill();
                    }
                    ctx.restore();
                } else if (p.tipo === 'shadowStabDagger') {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(Math.atan2(p.ty - p.y, p.tx - p.x));
                    ctx.beginPath();
                    ctx.moveTo(-10, -3);
                    ctx.lineTo(10, 0);
                    ctx.lineTo(-10, 3);
                    ctx.closePath();
                    ctx.fillStyle = p.color;
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 1;
                    ctx.fill();
                    ctx.stroke();

                    if (p.sparkle) {
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.beginPath();
                        ctx.arc(0, 0, 5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                } else if (p.tipo === 'capShield' && capShieldImg.complete) {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    ctx.drawImage(capShieldImg, -20, -20, 40, 40);
                    ctx.restore();
                } else if (p.tipo === 'usagentBullet') {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(Math.atan2(p.ty - p.y, p.tx - p.x));
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                } else if (p.tipo === 'wandaIllusionPulse' && wandaIllusionImg.complete) {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.globalAlpha = 0.6 * (1 - (Date.now() - p.inicio) / p.duracao);
                    ctx.drawImage(wandaIllusionImg, -p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();
                } else if (p.tipo === 'lokiPoisonDagger') {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(Math.atan2(p.ty - p.y, p.tx - p.x));
                    ctx.beginPath();
                    ctx.moveTo(-15, 0);
                    ctx.lineTo(15, 0);
                    ctx.lineTo(10, -5);
                    ctx.moveTo(15, 0);
                    ctx.lineTo(10, 5);
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = 3;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(10, 0, 5, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
                    ctx.fill();
                    ctx.restore();
                } else if (p.tipo === 'droneLaserProjectile') {
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.tx, p.ty);
                    ctx.strokeStyle = p.color; ctx.lineWidth = p.width;
                    ctx.globalAlpha = 1;
                    ctx.stroke();
                }
            });
        }

        function desenharRaio(pontoInicial, pontoFinal, segmentos, dispersao, corBase = '0, 220, 255') {
            ctx.beginPath();
            ctx.moveTo(pontoInicial.x, pontoInicial.y);
            const delta = { x: (pontoFinal.x - pontoInicial.x) / segmentos, y: (pontoFinal.y - pontoInicial.y) / segmentos };
            for (let i = 1; i < segmentos; i++) {
                const offsetX = (Math.random() - 0.5) * dispersao * (1 - (i / segmentos));
                const offsetY = (Math.random() - 0.5) * dispersao * (1 - (i / segmentos));
                ctx.lineTo(pontoInicial.x + i * delta.x + offsetX, pontoInicial.y + i * delta.y + offsetY);
            }
            ctx.lineTo(pontoFinal.x, pontoFinal.y);
            ctx.strokeStyle = `rgba(${corBase}, ${0.4 + Math.random() * 0.5})`;
            ctx.lineWidth = 1 + Math.random() * 2.5;
            ctx.shadowColor = `rgba(${corBase}, 0.7)`; ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        function desenharEfeitosVisuais(deltaTime) {
            const agora = Date.now();
            for (let i = efeitosVisuais.length - 1; i >= 0; i--) {
                const efeito = efeitosVisuais[i];
                const tempoDecorrido = agora - efeito.inicio;
                if (tempoDecorrido > efeito.duracao) { efeitosVisuais.splice(i, 1); continue; }
                const progresso = tempoDecorrido / efeito.duracao;
                ctx.save();
                if (efeito.tipo === 'raioComplexo') {
                    desenharRaio(efeito.pontoInicial, efeito.pontoFinal, 10, 25, efeito.corBase);
                } else if (efeito.tipo === 'unibeam') {
                    const fimX = efeito.x + Math.cos(efeito.angulo) * canvas.width * 1.5;
                    const fimY = efeito.y + Math.sin(efeito.angulo) * canvas.height * 1.5;
                    ctx.beginPath(); ctx.moveTo(efeito.x, efeito.y); ctx.lineTo(fimX, fimY);
                    ctx.strokeStyle = `rgba(0, 191, 255, ${0.4 * (1 - progresso)})`;
                    ctx.lineWidth = 25 + (1 - progresso) * 10; ctx.lineCap = 'round';
                    ctx.shadowColor = "rgba(0,191,255,0.7)"; ctx.shadowBlur = 20;
                    ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(efeito.x, efeito.y); ctx.lineTo(fimX, fimY);
                    ctx.strokeStyle = `rgba(220, 245, 255, ${0.7 * (1 - progresso)})`;
                    ctx.lineWidth = 10 + (1 - progresso) * 5;
                    ctx.stroke();
                } else if (efeito.tipo === 'explosaoRedHulk') {
                    const pulseScale = 1 + Math.sin(progresso * Math.PI * 2) * 0.1;
                    const currentRadius = efeito.raio * progresso * pulseScale;

                    const grad = ctx.createRadialGradient(efeito.x, efeito.y, 0, efeito.x, efeito.y, currentRadius);
                    grad.addColorStop(0, `rgba(255, 100, 0, ${0.8 * (1 - progresso)})`);
                    grad.addColorStop(0.7, `rgba(255, 0, 0, ${0.4 * (1 - progresso)})`);
                    grad.addColorStop(1, 'rgba(255, 0, 0, 0)');
                    ctx.beginPath(); ctx.arc(efeito.x, efeito.y, currentRadius, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();

                    (efeito.particulas || []).forEach(p => {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.tamanho * (1 - progresso), 0, Math.PI * 2);
                        const r = Math.floor(255);
                        const g = Math.floor(Math.random() * 150 + 100 * (1 - progresso));
                        const b = 0;
                        ctx.fillStyle = `rgba(${r},${g},${b},${(1 - progresso).toFixed(2)})`;
                        ctx.fill();
                        p.x += p.dx * (1 + progresso); p.y += p.dy * (1 + progresso);
                    });
                } else if (efeito.tipo === 'ondaEmma') {
                    const raioAtual = efeito.raio * progresso;
                    ctx.strokeStyle = `rgba(200, 200, 255, ${0.8 * (1 - progresso)})`;
                    ctx.lineWidth = 4 + (1 - progresso) * 4;
                    ctx.beginPath(); ctx.arc(efeito.x, efeito.y, raioAtual, 0, Math.PI * 2); ctx.stroke();
                } else if (efeito.tipo === 'explosaoEmma') {
                    const raioAtual = efeito.raio * (0.5 + progresso * 0.5);
                    ctx.fillStyle = `rgba(173, 216, 230, ${0.5 * (1 - progresso)})`;
                    ctx.beginPath(); ctx.arc(efeito.x, efeito.y, raioAtual, 0, Math.PI * 2); ctx.fill();
                } else if (efeito.tipo === 'psi') {
                    const progressoPsi = Math.sin(progresso * Math.PI);
                    ctx.beginPath(); ctx.arc(efeito.tx, efeito.ty - 10, 10 * progressoPsi, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(255, 105, 180, ${0.7 * (1 - progresso)})`;
                    ctx.lineWidth = 2 + progressoPsi * 2; ctx.stroke();
                } else if (efeito.tipo === 'laser') {
                    ctx.beginPath(); ctx.moveTo(efeito.x, efeito.y); ctx.lineTo(efeito.tx, efeito.ty);
                    ctx.strokeStyle = efeito.cor; ctx.lineWidth = efeito.largura || 2;
                    ctx.globalAlpha = Math.max(0, 1 - progresso * 2);
                    ctx.stroke();
                } else if (efeito.tipo === 'levelUp') {
                    ctx.fillStyle = `rgba(255, 255, 0, ${0.5 * (1 - progresso)})`;
                    ctx.font = `bold ${16 + 10 * progresso}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.fillText(`Nível ${efeito.level}!`, efeito.x, efeito.y - 30 - 10 * progresso);
                    ctx.textAlign = 'start';
                } else if (efeito.tipo === 'auraFireParticle') {
                    ctx.beginPath();
                    ctx.arc(efeito.x, efeito.y, efeito.tamanho * (1 - progresso), 0, Math.PI * 2);
                    ctx.fillStyle = efeito.cor.replace(/,1\)/, `,${(1 - progresso).toFixed(2)})`);
                    ctx.fill();
                    efeito.x += efeito.dx * (deltaTime / 1000);
                    efeito.y += efeito.dy * (deltaTime / 1000);
                } else if (efeito.tipo === 'slowEffect') {
                    const currentRadius = efeito.raio + Math.sin(tempoDecorrido / 100) * 5;
                    ctx.beginPath();
                    ctx.arc(efeito.x, efeito.y, currentRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = efeito.color.replace(/, 0.4\)/, `, ${0.4 * (1 - progresso)})`);
                    ctx.lineWidth = 3 + (1 - progresso) * 2;
                    ctx.stroke();
                } else if (efeito.tipo === 'textPop') {
                    ctx.fillStyle = efeito.color;
                    ctx.font = `bold ${14 + 10 * progresso}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.fillText(efeito.text, efeito.x, efeito.y - 10 - (20 * progresso));
                    ctx.textAlign = 'start';
                } else if (efeito.tipo === 'usagentShockwave') {
                    const currentRadius = efeito.raio * progresso;
                    ctx.strokeStyle = `rgba(180, 190, 255, ${0.9 * (1 - progresso)})`;
                    ctx.lineWidth = 5 + (1 - progresso) * 10;
                    ctx.beginPath();
                    ctx.arc(efeito.x, efeito.y, currentRadius, 0, Math.PI * 2);
                    ctx.stroke();
                    const numSparkles = 5;
                    for (let s = 0; s < numSparkles; s++) {
                        const angle = Math.random() * Math.PI * 2;
                        const dist = Math.random() * currentRadius;
                        const sparkX = efeito.x + Math.cos(angle) * dist;
                        const sparkY = efeito.y + Math.sin(angle) * dist;
                        ctx.fillStyle = `rgba(255, 255, 255, ${1 - progresso})`;
                        ctx.beginPath();
                        ctx.arc(sparkX, sparkY, 2 * (1 - progresso), 0, Math.PI * 2);
                        ctx.fill();
                    }
                } else if (efeito.tipo === 'usagentCombatCall') {
                    const currentRadius = efeito.raio * progresso;
                    ctx.strokeStyle = `rgba(255, 215, 0, ${0.7 * (1 - progresso)})`;
                    ctx.lineWidth = 5 + (1 - progresso) * 5;
                    ctx.beginPath();
                    ctx.arc(efeito.x, efeito.y, currentRadius, 0, Math.PI * 2);
                    ctx.stroke();
                    const numParticles = 8;
                    for (let p = 0; p < numParticles; p++) {
                        const angle = Math.random() * Math.PI * 2;
                        const dist = Math.random() * currentRadius;
                        const px = efeito.x + Math.cos(angle) * dist;
                        const py = efeito.y + Math.sin(angle) * dist;
                        ctx.fillStyle = `rgba(255, 255, 0, ${0.8 * (1 - progresso)})`;
                        ctx.beginPath();
                        ctx.arc(px, py, 2 * (1 - progresso), 0, Math.PI * 2);
                        ctx.fill();
                    }
                } else if (efeito.tipo === 'hexZonaVisual') {
                    ctx.fillStyle = `rgba(128, 0, 128, ${0.3 * (1 - progresso)})`;
                    ctx.beginPath();
                    ctx.arc(efeito.x, efeito.y, efeito.raio, 0, Math.PI * 2);
                    ctx.fill();
                } else if (efeito.tipo === 'runeVisual') {
                    ctx.strokeStyle = `rgba(255, 0, 0, ${0.8 * (1 - progresso)})`;
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    const outerRadius = efeito.raio;
                    const innerRadius = outerRadius * 0.6;
                    const numPoints = 5;
                    for (let i = 0; i < numPoints * 2; i++) {
                        const radius = (i % 2 == 0) ? outerRadius : innerRadius;
                        const angle = Math.PI / numPoints * i + progresso * Math.PI * 2;
                        const x = efeito.x + Math.cos(angle) * radius;
                        const y = efeito.y + Math.sin(angle) * radius;
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                    ctx.stroke();
                } else if (efeito.tipo === 'reviveVisual') {
                    const pulse = Math.sin(tempoDecorrido / 50) * 5;
                    const radius = 30 + pulse;
                    ctx.strokeStyle = `rgba(173, 216, 230, ${0.8 * (1 - progresso)})`;
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    ctx.arc(efeito.x, efeito.y, radius, 0, Math.PI * 2);
                    ctx.stroke();
                } else if (efeito.tipo === 'nanobotCloud') {
                    const currentSize = 10 + (progresso * 40);
                    ctx.beginPath();
                    ctx.arc(efeito.tx, efeito.ty, currentSize, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(100, 100, 100, ${0.4 * (1 - progresso)})`;
                    ctx.fill();
                    for (let i = 0; i < 5; i++) {
                        const px = efeito.tx + (Math.random() - 0.5) * currentSize;
                        const py = efeito.ty + (Math.random() - 0.5) * currentSize;
                        ctx.beginPath();
                        ctx.arc(px, py, 2 * (1 - progresso), 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(150, 150, 150, ${0.8 * (1 - progresso)})`;
                        ctx.fill();
                    }
                } else if (efeito.tipo === 'nanobotParticle') {
                    ctx.beginPath();
                    ctx.arc(efeito.x, efeito.y, 3 * (1 - progresso), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(180, 180, 180, ${0.8 * (1 - progresso)})`;
                    ctx.fill();
                } else if (efeito.tipo === 'satelliteStrike') {
                    const laserHeight = canvas.height * progresso;
                    const laserWidth = 20 * (1 - progresso);
                    ctx.fillStyle = `rgba(255, 165, 0, ${0.8 * (1 - progresso)})`;
                    ctx.shadowColor = `rgba(255, 165, 0, 0.9)`;
                    ctx.shadowBlur = 20;
                    ctx.fillRect(efeito.x - laserWidth / 2, 0, laserWidth, laserHeight);

                    if (progresso >= 0.9) {
                        const explosionRadius = efeito.raio * (progresso - 0.9) * 10;
                        ctx.beginPath();
                        ctx.arc(efeito.x, efeito.y, explosionRadius, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255, 100, 0, ${1 - progresso})`;
                        ctx.fill();
                    }
                    if (!efeito.damageApplied && progresso > 0.5) {
                        inimigos.forEach(inimigo => {
                            const dist = Math.hypot(efeito.x - centroAlvoX(inimigo), efeito.y - centroAlvoY(inimigo));
                            if (dist < efeito.raio) {
                                inimigo.hp -= efeito.dano;
                                inimigo.ultimoAtacante = efeito.dono;
                                if (Math.random() < efeito.hackChance && !(inimigo.isDebuffImmune && inimigo.debuffImmuneEndTime > Date.now())) {
                                    inimigo.isHacked = true;
                                    efeitosVisuais.push({ tipo: 'textPop', x: centroAlvoX(inimigo), y: centroAlvoY(inimigo) - 30, text: `Hack!`, color: 'cyan', duracao: 1000, inicio: Date.now() });
                                }
                            }
                        });
                        efeito.damageApplied = true;
                    }
                    ctx.restore();
                } else if (efeito.tipo === 'ultronCore') {
                    ctx.save();
                    ctx.translate(efeito.x, efeito.y);
                    const pulse = Math.sin(tempoDecorrido / 100) * 5 + 5;
                    ctx.beginPath();
                    ctx.arc(0, 0, 15 + pulse, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(100, 0, 100, ${0.5 + (pulse / 20)})`;
                    ctx.fill();
                    ctx.strokeStyle = `rgba(200, 0, 200, ${0.8 + (pulse / 20)})`;
                    ctx.lineWidth = 3;
                    ctx.stroke();

                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 12px Arial';
                    ctx.textAlign = 'center';
                    const remainingTime = Math.ceil((efeito.duracao - tempoDecorrido) / 1000);
                    ctx.fillText(`${remainingTime}s`, 0, 5);
                    ctx.restore();
                } else if (efeito.tipo === 'explosaoCapMarvelMissile') {
                    const currentRadius = efeito.raio * progresso;
                    const color = efeito.color || 'gold';
                    ctx.fillStyle = `rgba(${color === 'gold' ? '255,215,0' : '255,100,0'}, ${0.7 * (1 - progresso)})`;
                    ctx.beginPath();
                    ctx.arc(efeito.x, efeito.y, currentRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = `rgba(${color === 'gold' ? '255,215,0' : '255,100,0'}, ${0.9 * (1 - progresso)})`;
                    ctx.lineWidth = 5 * (1 - progresso);
                    ctx.stroke();
                } else if (efeito.tipo === 'bamf') {
                    ctx.save();
                    ctx.translate(efeito.x, efeito.y);
                    const alpha = 1 - progresso;
                    const size = 20 + progresso * 30; // Grows and fades
                    ctx.strokeStyle = `rgba(${efeito.color === 'blue' ? '0,0,255' : '128,0,128'}, ${alpha})`;
                    ctx.lineWidth = 3 * (1 - progresso);
                    for (let j = 0; j < 6; j++) {
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        const angle = (Math.PI * 2 / 6) * j;
                        ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
                        ctx.stroke();
                    }
                    ctx.restore();
                } else if (efeito.tipo === 'swordCut') {
                    ctx.save();
                    ctx.translate(efeito.x, efeito.y);
                    ctx.rotate(efeito.angle);
                    const alpha = 1 - progresso;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(-15 * progresso, 0);
                    ctx.lineTo(15 * progresso, 0);
                    ctx.stroke();
                    ctx.restore();
                }
                ctx.restore();
            }
        }

        // --- GAME UPDATE FUNCTIONS ---
        function atualizarInimigos(deltaTime) {
            for (let i = inimigos.length - 1; i >= 0; i--) {
                const inimigo = inimigos[i];

                let isInRune = false;
                torres.forEach(torre => {
                    if (torre.tipo === 'wanda' && torre.isRuneActive && torre.runeEndTime > Date.now()) {
                        const distToWanda = Math.hypot(centroAlvoX(inimigo) - torre.x, centroAlvoY(inimigo) - torre.y);
                        if (distToWanda < towerData.wanda.runeRadius) {
                            isInRune = true;
                            if (towerData.wanda.runeCleanseExisting) {
                                inimigo.isConfuso = false;
                                inimigo.isStunned = false;
                                inimigo.isPoisoned = false;
                                inimigo.isSlowed = false;
                                inimigo.isInfested = false;
                                inimigo.isBleeding = false; // Cleanse bleeding
                                inimigo.isDisarmed = false; // Cleanse disarm
                            }
                            inimigo.isDebuffImmune = true;
                            inimigo.debuffImmuneEndTime = torre.runeEndTime;
                        }
                    }
                });
                if (!isInRune && inimigo.debuffImmuneEndTime && inimigo.debuffImmuneEndTime < Date.now()) {
                    inimigo.isDebuffImmune = false;
                }

                // Check for Captain America's Defensive Stance damage reduction
                torres.forEach(torre => {
                    if (torre.tipo === 'captainamerica' && torre.isDefensiveStanceActive) {
                        const distToCap = Math.hypot(centroAlvoX(inimigo) - torre.x, centroAlvoY(inimigo) - torre.y);
                        if (distToCap < towerData.captainamerica.ricochetChainRadius) {
                            inimigo.damageReductionBuff = towerData.captainamerica.damageReductionFactor;
                            inimigo.damageReductionBuffEndTime = torre.defensiveStanceTimer;
                        }
                    }
                });

                if (inimigo.isConfuso) {
                    inimigo.timerConfusao -= deltaTime;
                    if (inimigo.timerConfusao <= 0) inimigo.isConfuso = false;
                    continue;
                }
                if (inimigo.isStunned) {
                    inimigo.stunTimer -= deltaTime;
                    if (inimigo.stunTimer <= 0) {
                        inimigo.isStunned = false;
                    }
                    continue;
                }
                if (inimigo.isDisarmed) { // Disarm effect for Nightcrawler
                    inimigo.disarmTimer -= deltaTime;
                    if (inimigo.disarmTimer <= 0) {
                        inimigo.isDisarmed = false;
                    }
                    // If disarmed, enemies cannot move forward (or attack, if implemented)
                    continue; // Skip movement if disarmed
                }

                // Bleeding damage
                if (inimigo.isBleeding) {
                    inimigo.bleedTimer -= deltaTime;
                    if (Date.now() - inimigo.lastBleedTick > inimigo.bleedTickRate) {
                        inimigo.hp -= inimigo.bleedDamagePerTick;
                        inimigo.lastBleedTick = Date.now();
                    }
                    if (inimigo.bleedTimer <= 0) {
                        inimigo.isBleeding = false;
                    }
                }

                // Poison damage
                if (inimigo.isPoisoned) {
                    inimigo.poisonTimer -= deltaTime;
                    if (Date.now() - inimigo.lastPoisonTick > inimigo.poisonTickRate) {
                        inimigo.hp -= inimigo.poisonDamagePerTick;
                        inimigo.lastPoisonTick = Date.now();
                        efeitosVisuais.push({
                            tipo: 'laser',
                            x: inimigo.x + 20,
                            y: inimigo.y + 20,
                            tx: inimigo.x + 20 + (Math.random() - 0.5) * 5,
                            ty: inimigo.y + 20 + (Math.random() - 0.5) * 5,
                            duracao: 50,
                            inicio: Date.now(),
                            cor: 'rgba(0, 255, 0, 0.7)',
                            largura: 1
                        });
                    }
                    if (inimigo.poisonTimer <= 0) {
                        inimigo.isPoisoned = false;
                    }
                }

                if (inimigo.isSlowed) {
                    inimigo.slowEndTime -= deltaTime;
                    if (inimigo.slowEndTime <= 0) {
                        inimigo.isSlowed = false;
                        inimigo.slowFactor = 0;
                    }
                    inimigo.x += inimigo.vel * (1 - inimigo.slowFactor) * (deltaTime / 1000);
                    continue;
                }

                if (inimigo.isInfested) {
                    inimigo.nanobotInfestationTimer -= deltaTime;
                    if (Date.now() - inimigo.lastNanobotTick > towerData.ultron.nanobotTickRate) {
                        inimigo.hp -= towerData.ultron.nanobotDamagePerTick;
                        inimigo.lastNanobotTick = Date.now();
                        efeitosVisuais.push({
                            tipo: 'nanobotParticle',
                            x: inimigo.x + 20 + (Math.random() - 0.5) * 10,
                            y: inimigo.y + 20 + (Math.random() - 0.5) * 10,
                            duracao: 300,
                            inicio: Date.now(),
                        });
                    }
                    if (inimigo.nanobotInfestationTimer <= 0) {
                        inimigo.isInfested = false;
                        inimigo.nanobotDamageReduction = 0;
                    }
                }

                let attractedToDummy = false;
                for (const dummy of dummyTowers) {
                    const distToDummy = Math.hypot(centroAlvoX(inimigo) - centroAlvoX(dummy), centroAlvoY(inimigo) - centroAlvoY(dummy));
                    if (distToDummy < towerData.loki.illusionRadius && Date.now() < dummy.spawnTime + dummy.lifetime) {
                        const angleToDummy = Math.atan2(centroAlvoY(dummy) - centroAlvoY(inimigo), centroAlvoX(dummy) - centroAlvoX(inimigo));
                        inimigo.x += Math.cos(angleToDummy) * inimigo.vel * (deltaTime / 1000);
                        inimigo.y += Math.sin(angleToDummy) * inimigo.vel * (deltaTime / 1000);
                        attractedToDummy = true;
                        break;
                    }
                }

                if (attractedToDummy) {
                    continue;
                }

                inimigo.x += inimigo.vel * (deltaTime / 1000);

                if (inimigo.x > canvas.width) {
                    inimigos.splice(i, 1); vida--;
                    const vidaElement = document.getElementById('vida');
                    if (vidaElement) {
                        vidaElement.textContent = vida;
                    }
                    if (vida <= 0) {
                        mostrarMsg("Game Over! Os inimigos dominaram a Terra.");
                        pausado = true;
                    }
                }
            }
        }

        function atualizarProjeteis(deltaTime) {
            let removed = false;
            for (let i = projetis.length - 1; i >= 0; i--) {
                const p = projetis[i];
                removed = false;

                // Projectiles pass through Nightcrawler when he is dancing
                if (p.dono && p.dono.tipo === 'noturno' && p.dono.isDancing) {
                    // This projectile is from Nightcrawler, it shouldn't hit him
                } else {
                    const targetTower = torres.find(t => t.id === p.dono.id);
                    if (targetTower && targetTower.tipo === 'noturno' && targetTower.isDancing) {
                        // Projectile is targeting Nightcrawler and he is dancing, make it pass through
                        continue;
                    }
                }


                if (p.tipo === 'diamondShard' || p.tipo === 'wandaIllusionPulse' || p.tipo === 'droneLaserProjectile') {
                    if (Date.now() - p.spawnTime > p.lifespan) {
                        projetis.splice(i, 1);
                        continue;
                    }
                }

                const angulo = Math.atan2(p.ty - p.y, p.tx - p.x);
                const velocidadeFrame = p.vel * (deltaTime / (1000 / 60));
                p.x += Math.cos(angulo) * velocidadeFrame;
                p.y += Math.sin(angulo) * velocidadeFrame;

                if (p.tipo === 'mjolnir' || p.tipo === 'capShield') {
                    p.rotation += 0.3 * (deltaTime / (1000 / 60));
                }

                for (let j = inimigos.length - 1; j >= 0; j--) {
                    const inimigo = inimigos[j];
                    const alreadyHit = p.acertados && p.acertados.includes(inimigo.id);

                    const dist = Math.hypot(p.x - (inimigo.x + 20), p.y - (inimigo.y + 20));
                    if (dist < 20 + p.raioColisao && !alreadyHit) {
                        let actualDamage = p.dano;
                        if (inimigo.damageReductionBuff && inimigo.damageReductionBuffEndTime > Date.now()) {
                            actualDamage *= (1 - inimigo.damageReductionBuff);
                            if (p.dono && p.dono.tipo === 'captainamerica' && Math.random() < towerData.captainamerica.reflectDamageChance) {
                                const reflectedDamage = actualDamage * towerData.captainamerica.reflectDamageMultiplier;
                                efeitosVisuais.push({
                                    tipo: 'textPop',
                                    x: centroAlvoX(p.dono),
                                    y: centroAlvoY(p.dono) - 30,
                                    text: `Refletido! ${Math.round(reflectedDamage)}`,
                                    color: 'blue',
                                    duracao: 800,
                                    inicio: Date.now()
                                });
                            }
                        }
                        if (inimigo.isInfested && inimigo.nanobotInfestationTimer > 0) {
                            actualDamage *= (1 + inimigo.nanobotDamageReduction);
                        }

                        const applyDebuff = !(inimigo.isDebuffImmune && inimigo.debuffImmuneEndTime > Date.now());

                        if (p.tipo === 'hawkeyeArrow_shock') {
                            if (applyDebuff && (!inimigo.isStunned || inimigo.stunTimer < p.stunDuration)) {
                                inimigo.isStunned = true;
                                inimigo.stunTimer = p.stunDuration;
                                efeitosVisuais.push({ tipo: 'stunEffect', x: centroAlvoX(inimigo), y: centroAlvoY(inimigo), duracao: p.stunDuration, inicio: Date.now() });
                            }
                            inimigo.hp -= actualDamage;
                            if (p.dono) inimigo.ultimoAtacante = p.dono;
                            projetis.splice(i, 1); removed = true; break;
                        } else if (p.tipo === 'hawkeyeArrow_ice') {
                            if (applyDebuff && Math.random() < 0.33) {
                                if (!inimigo.isStunned || inimigo.stunTimer < p.stunDuration) {
                                    inimigo.isStunned = true;
                                    inimigo.stunTimer = p.stunDuration;
                                    efeitosVisuais.push({ tipo: 'laser', x: centroAlvoX(inimigo), y: centroAlvoY(inimigo), tx: centroAlvoX(inimigo) + (Math.random() - 0.5) * 10, ty: centroAlvoY(inimigo) + (Math.random() - 0.5) * 10, duracao: 150, inicio: Date.now(), cor: 'rgba(0, 200, 255, 0.7)', largura: 3 });
                            }
                        }
                            inimigo.hp -= actualDamage;
                            if (p.dono) inimigo.ultimoAtacante = p.dono;
                            projetis.splice(i, 1); removed = true; break;
                        } else if (p.tipo === 'hawkeyeArrow_poison') {
                            if (applyDebuff) {
                                inimigo.isPoisoned = true;
                                inimigo.poisonTimer = p.poisonDuration;
                                inimigo.lastPoisonTick = Date.now();
                                inimigo.poisonDamagePerTick = p.poisonDamagePerTick;
                            }
                            inimigo.hp -= actualDamage;
                            if (p.dono) inimigo.ultimoAtacante = p.dono;
                            projetis.splice(i, 1); removed = true; break;
                        } else if (p.tipo === 'hawkeyeArrow_explosive') {
                            inimigo.hp -= actualDamage;
                            if (p.dono) inimigo.ultimoAtacante = p.dono;

                            inimigos.forEach(aoeEnemy => {
                                const aoeDist = Math.hypot(p.x - centroAlvoX(aoeEnemy), p.y - centroAlvoY(aoeEnemy));
                                if (aoeDist < p.explosionRadius && aoeEnemy.id !== inimigo.id) {
                                    aoeEnemy.hp -= p.explosionDamage;
                                    aoeEnemy.ultimoAtacante = p.dono;
                                    efeitosVisuais.push({ tipo: 'laser', x: centroAlvoX(aoeEnemy), y: centroAlvoY(aoeEnemy), tx: centroAlvoX(aoeEnemy) + (Math.random() - 0.5) * 5, ty: centroAlvoY(aoeEnemy) + (Math.random() - 0.5) * 5, duracao: 30, inicio: Date.now(), cor: 'rgba(255, 0, 0, 0.5)', largura: 3 });
                                }
                            });
                            efeitosVisuais.push({ tipo: 'explosaoRedHulk', x: p.x, y: p.y, raio: p.explosionRadius, inicio: Date.now(), duracao: 200, particulas: [] });
                            projetis.splice(i, 1); removed = true; break;
                        } else if (p.tipo === 'diamondShard' || p.tipo.startsWith('hawkeyeArrow_standard') || p.tipo.startsWith('hawkeyeArrow_triple') || p.tipo === 'mjolnir' || p.tipo === 'usagentBullet' || p.tipo === 'droneLaserProjectile') {
                            inimigo.hp -= actualDamage;
                            if (p.dono) inimigo.ultimoAtacante = p.dono;
                            if (p.acertados) p.acertados.push(inimigo.id);

                            if (p.tipo !== 'piercing' && p.tipo !== 'mjolnir' && p.tipo !== 'capShield') {
                                projetis.splice(i, 1); removed = true; break;
                            }
                        } else if (p.tipo === 'shadowStabDagger') {
                            let finalDamage = p.dano;
                            inimigo.hp -= finalDamage;
                            if (p.dono) inimigo.ultimoAtacante = p.dono;
                            if (p.acertados) p.acertados.push(inimigo.id);

                            if (p.chainsLeft > 0) {
                                p.chainsLeft--;
                                let nextTarget = null;
                                let minDist = Infinity;
                                inimigos.forEach(e => {
                                    if (!p.acertados.includes(e.id) && e.id !== inimigo.id) {
                                        const distToEnemy = Math.hypot(centroAlvoX(inimigo) - centroAlvoX(e), centroAlvoY(inimigo) - centroAlvoY(e));
                                        if (distToEnemy < p.chainRadius && distToEnemy < minDist) {
                                            minDist = distToEnemy;
                                            nextTarget = e;
                                        }
                                    }
                                });

                                if (nextTarget) {
                                    p.x = centroAlvoX(inimigo);
                                    p.y = centroAlvoY(inimigo);
                                    p.tx = centroAlvoX(nextTarget);
                                    p.ty = centroAlvoY(nextTarget);
                                    p.acertados.push(nextTarget.id);
                                    p.sparkle = true;
                                    efeitosVisuais.push({ tipo: 'laser', x: p.x, y: p.y, tx: p.tx, ty: p.ty, duracao: 100, inicio: Date.now(), cor: 'rgba(100, 100, 100, 0.8)', largura: 2 });
                                } else {
                                    projetis.splice(i, 1); removed = true; break;
                                }
                            } else {
                                projetis.splice(i, 1); removed = true; break;
                            }
                        } else if (p.tipo === 'capShield') {
                            const capData = towerData.captainamerica;
                            const currentBounce = p.maxBounces - p.bouncesLeft;
                            let damageToApply = p.dano * (1 - currentBounce * capData.ricochetDamageReduction);
                            if (damageToApply < 1) damageToApply = 1;

                            inimigo.hp -= actualDamage;
                            if (p.dono) inimigo.ultimoAtacante = p.dono;
                            p.acertados.push(inimigo.id);

                            if (p.bouncesLeft > 0) {
                                p.bouncesLeft--;
                                let nextTarget = null;
                                let closestDist = Infinity;
                                inimigos.forEach(e => {
                                    if (!p.acertados.includes(e.id)) {
                                        const distToEnemy = Math.hypot(centroAlvoX(inimigo) - centroAlvoX(e), centroAlvoY(inimigo) - centroAlvoY(e));
                                        if (distToEnemy < capData.ricochetChainRadius && distToEnemy < closestDist) {
                                            closestDist = distToEnemy;
                                            nextTarget = e;
                                        }
                                    }
                                });
                                if (nextTarget) {
                                    p.x = centroAlvoX(inimigo);
                                    p.y = centroAlvoY(inimigo);
                                    p.tx = centroAlvoX(nextTarget);
                                    p.ty = centroAlvoY(nextTarget);
                                    efeitosVisuais.push({ tipo: 'laser', x: centroAlvoX(inimigo), y: centroAlvoY(inimigo), tx: centroAlvoX(nextTarget), ty: centroAlvoY(nextTarget), duracao: 100, inicio: Date.now(), cor: 'rgba(50, 50, 255, 0.7)', largura: 3 });
                                } else {
                                    projetis.splice(i, 1); removed = true; break;
                                }
                            } else {
                                projetis.splice(i, 1); removed = true; break;
                            }
                        }
                        else if (p.tipo === 'wandaIllusionPulse') {
                            if (applyDebuff) {
                                inimigo.isConfuso = true;
                                inimigo.timerConfusao = p.illusionConfuseDuration;
                            }
                            inimigo.hp -= actualDamage;
                            if (p.dono) inimigo.ultimoAtacante = p.dono;
                            projetis.splice(i, 1); removed = true; break;
                        } else if (p.tipo === 'lokiPoisonDagger') {
                            if (p.halfHpOnHit && inimigo.hp > inimigo.maxHp * 0.3 && Math.random() < p.poisonChance) {
                                inimigo.hp = inimigo.hp / 2;
                                efeitosVisuais.push({
                                    tipo: 'textPop',
                                    x: centroAlvoX(inimigo),
                                    y: centroAlvoY(inimigo) - 30,
                                    text: `Meia Vida!`,
                                    color: 'darkred',
                                    duracao: 800,
                                    inicio: Date.now()
                                });
                            }
                            if (applyDebuff && Math.random() < p.poisonChance) {
                                inimigo.isPoisoned = true;
                                inimigo.poisonTimer = p.poisonDuration;
                                inimigo.lastPoisonTick = Date.now();
                                inimigo.poisonDamagePerTick = p.poisonDamagePerTick;
                            }
                            inimigo.hp -= actualDamage;
                            if (p.dono) inimigo.ultimoAtacante = p.dono;
                            projetis.splice(i, 1); removed = true; break;
                        }
                    }
                }
                if (removed) continue;

                if (p.tipo === 'mjolnir' || p.tipo === 'capShield') {
                    const distAlvo = Math.hypot(p.x - p.tx, p.y - p.ty);
                    if (distAlvo < velocidadeFrame) {
                        if (p.estado === 'ida' && p.dono) {
                            p.estado = 'volta'; p.tx = p.dono.x; p.ty = p.dono.y;
                            p.acertados = [];
                        } else {
                            projetis.splice(i, 1);
                        }
                    }
                } else if (p.tipo === 'diamondShard' || p.tipo.startsWith('hawkeyeArrow_') || p.tipo === 'shadowStabDagger' || p.tipo === 'usagentBullet' || p.tipo === 'wandaIllusionPulse' || p.tipo === 'lokiPoisonDagger' || p.tipo === 'droneLaserProjectile') {
                    const distAlvo = Math.hypot(p.x - p.tx, p.y - p.ty);
                    if (distAlvo < velocidadeFrame || p.x < -50 || p.x > canvas.width + 50 || p.y < -50 || p.y > canvas.height + 50) {
                        projetis.splice(i, 1);
                    }
                }
            }
        }

        function atualizarDrones(deltaTime) {
            for (let i = drones.length - 1; i >= 0; i--) {
                const drone = drones[i];
                if (drone.mode === 'kamikaze') {
                    if (!drone.target || inimigos.findIndex(e => e.id === drone.target.id) === -1) {
                        drones.splice(i, 1);
                        continue;
                    }

                    const targetX = centroAlvoX(drone.target);
                    const targetY = centroAlvoY(drone.target);
                    const angle = Math.atan2(targetY - drone.y, targetX - drone.x);
                    const distanceToTarget = Math.hypot(targetX - drone.x, targetY - drone.y);
                    const moveAmount = drone.speed * (deltaTime / (1000 / 60));

                    if (distanceToTarget <= moveAmount + drone.radiusCollision) {
                        drone.target.hp -= drone.damage;
                        drone.target.ultimoAtacante = { tipo: 'ultron', id: drone.spawnerId };

                        inimigos.forEach(aoeEnemy => {
                            const aoeDist = Math.hypot(drone.x - centroAlvoX(aoeEnemy), drone.y - centroAlvoY(aoeEnemy));
                            if (aoeDist < drone.explosionRadius && aoeEnemy.id !== drone.target.id) {
                                aoeEnemy.hp -= drone.damage * 0.5;
                                aoeEnemy.ultimoAtacante = { tipo: 'ultron', id: drone.spawnerId };
                            }
                        });
                        efeitosVisuais.push({ tipo: 'explosaoRedHulk', x: drone.x, y: drone.y, raio: drone.explosionRadius, inicio: Date.now(), duracao: 200, particulas: gerarParticulasExplosao(drone.x, drone.y, drone.explosionRadius, 'gray') });

                        drones.splice(i, 1);
                        continue;
                    } else {
                        drone.x += Math.cos(angle) * moveAmount;
                        drone.y += Math.sin(angle) * moveAmount;
                    }
                } else if (drone.mode === 'sentinel') {
                    if (drone.cooldown > 0) {
                        drone.cooldown -= deltaTime;
                    }
                }
            }
        }

        function atualizarCooldownsTorres(deltaTime) {
            torres.forEach(torre => {
                torre.cooldown = Math.max(0, torre.cooldown - deltaTime);

                if (torre.tipo === 'emma') {
                    if (torre.cooldownDiamanteAtual > 0) torre.cooldownDiamanteAtual -= deltaTime;
                    if (torre.timerModo > 0) {
                        torre.timerModo -= deltaTime;
                        if (torre.timerModo <= 0) torre.modo = 'psiquico';
                    }
                    if (torre.cooldownOndaAtual > 0) torre.cooldownOndaAtual -= deltaTime;
                    if (torre.novaCooldownCurrent > 0) torre.novaCooldownCurrent -= deltaTime;
                } else if (torre.tipo === 'ironman') {
                    if (torre.unibeamCooldownAtual > 0) torre.unibeamCooldownAtual -= deltaTime;
                    if (torre.flightCooldown > 0) torre.flightCooldown -= deltaTime;
                    if (torre.flightAttackCooldownCurrent > 0) torre.flightAttackCooldownCurrent -= deltaTime;
                } else if (torre.tipo === 'thor') {
                    if (torre.mjolnirCooldown > 0) torre.mjolnirCooldown -= deltaTime;
                } else if (torre.tipo === 'ultron') {
                    if (torre.spawnCooldown > 0) torre.spawnCooldown -= deltaTime;
                    if (torre.kamikazeDroneCooldownCurrent !== undefined) torre.kamikazeDroneCooldownCurrent = Math.max(0, torre.kamikazeDroneCooldownCurrent - deltaTime);
                    if (torre.nanobotInfestationCooldownCurrent !== undefined) torre.nanobotInfestationCooldownCurrent = Math.max(0, torre.nanobotInfestationCooldownCurrent - deltaTime);
                    if (torre.satelliteStrikeCooldownCurrent !== undefined) torre.satelliteStrikeCooldownCurrent = Math.max(0, torre.satelliteStrikeCooldownCurrent - deltaTime);
                    if (torre.isReconstructing && Date.now() > torre.reconstructionEndTime) {
                        torre.isReconstructing = false;
                        console.log('Ultron reconstruído!');
                        efeitosVisuais.push({ tipo: 'textPop', x: torre.x, y: torre.y - 30, text: `Reconstruído!`, color: 'magenta', duracao: 1500, inicio: Date.now() });
                    }
                } else if (torre.tipo === 'redhulk') {
                    if (torre.auraCooldownCurrent > 0) torre.auraCooldownCurrent -= deltaTime;
                    if (torre.isAuraActive) {
                        torre.auraTimer -= deltaTime;
                        if (torre.auraTimer <= 0) {
                            torre.isAuraActive = false;
                            console.log('Aura de Fogo do Red Hulk terminou.');
                        }
                    }
                } else if (torre.tipo === 'loki') {
                    if (torre.illusionCooldownCurrent !== undefined) torre.illusionCooldownCurrent = Math.max(0, torre.illusionCooldownCurrent - deltaTime);
                    if (torre.isIllusionActive && Date.now() > torre.illusionEndTime) {
                        torre.isIllusionActive = false;
                        for (let i = dummyTowers.length - 1; i >= 0; i--) {
                            if (dummyTowers[i].spawnTime <= torre.illusionEndTime) {
                                dummyTowers.splice(i, 1);
                            }
                        }
                        console.log('Ilusão Perfeita de Loki terminou.');
                    }

                    if (torre.shapeshiftCooldownCurrent !== undefined) torre.shapeshiftCooldownCurrent = Math.max(0, torre.shapeshiftCooldownCurrent - deltaTime);
                    if (torre.isShapeshiftActive && Date.now() > torre.shapeshiftEndTime) {
                        torre.isShapeshiftActive = false;
                        torre.copiedTowerType = null;
                        torre.copiedDamage = 0;
                        torre.copiedCooldown = 0;
                        torre.copiedStunChance = 0;
                        torre.copiedStunDuration = 0;
                        console.log('Forma Serpenteante de Loki terminou.');
                    }
                    if (torre.variantCooldownCurrent !== undefined) torre.variantCooldownCurrent = Math.max(0, torre.variantCooldownCurrent - deltaTime);

                } else if (torre.tipo === 'usagent') {
                    if (torre.chargeCooldownCurrent !== undefined) torre.chargeCooldownCurrent = Math.max(0, torre.chargeCooldownCurrent - deltaTime);
                    if (torre.combatCallCooldownCurrent !== undefined) torre.combatCallCooldownCurrent = Math.max(0, torre.combatCallCooldownCurrent - deltaTime);
                    if (torre.isCombatCallActive && Date.now() > torre.combatCallBuffEndTime) {
                        torre.isCombatCallActive = false;
                        torres.forEach(ally => {
                            if (ally.tempBuffEndTime && Date.now() > ally.tempBuffEndTime) {
                                ally.tempDamageBuff = 0;
                                ally.tempAttackSpeedBuff = 0;
                                ally.tempBuffEndTime = 0;
                            }
                        });
                        console.log('Chamado à Luta do USAgent terminou.');
                    }
                } else if (torre.tipo === 'captainamerica') {
                    if (torre.defensiveStanceCooldownCurrent !== undefined) torre.defensiveStanceCooldownCurrent = Math.max(0, torre.defensiveStanceCooldownCurrent - deltaTime);
                    if (torre.isDefensiveStanceActive) {
                        torre.defensiveStanceTimer -= deltaTime;
                        if (torre.defensiveStanceTimer <= 0) {
                            torre.isDefensiveStanceActive = false;
                            console.log('Postura Defensiva do Capitão América terminou.');
                        }
                    }
                } else if (torre.tipo === 'wanda') {
                    if (torre.hexZonaCooldownCurrent !== undefined) torre.hexZonaCooldownCurrent = Math.max(0, torre.hexZonaCooldownCurrent - deltaTime);
                    if (torre.runeCooldownCurrent !== undefined) torre.runeCooldownCurrent = Math.max(0, torre.runeCooldownCurrent - deltaTime);
                    if (torre.isHexZonaActive && Date.now() > torre.hexZonaEndTime) {
                        torre.isHexZonaActive = false;
                    }
                    if (torre.isRuneActive && Date.now() > torre.runeEndTime) {
                        torre.isRuneActive = false;
                    }
                    if (torre.revivedTimer && torre.revivedTimer > 0) {
                        torre.revivedTimer -= deltaTime;
                        if (torre.revivedTimer <= 0) {
                            torre.isDestroyed = true;
                            const indexInTorres = torres.findIndex(t => t.id === torre.id);
                            if (indexInTorres > -1) {
                                torres.splice(indexInTorres, 1);
                                destroyedTowers.push(torre);
                            }
                            console.log(`${torre.tipo} temporariamente revivido terminou a duração.`);
                        }
                    }
                } else if (torre.tipo === 'captainmarvel') {
                    if (torre.missileCooldownCurrent > 0) torre.missileCooldownCurrent = Math.max(0, torre.missileCooldownCurrent - deltaTime);

                    if (torre.isHumanMissileActive) {
                        torre.missileElapsedTime += deltaTime;
                        const capData = towerData.captainmarvel;
                        const targetX = centroAlvoX(torre.humanMissileTarget);
                        const targetY = centroAlvoY(torre.humanMissileTarget);
                        const distToTarget = Math.hypot(targetX - torre.missileStartX, targetY - torre.missileStartY);
                        const progress = distToTarget > 0 ? Math.min(torre.missileElapsedTime / torre.missileDuration, 1) : 1;

                        torre.x = torre.missileStartX + (targetX - torre.missileStartX) * progress;
                        torre.y = torre.missileStartY + (targetY - torre.missileStartY) * progress;

                        if (progress >= 1 && !torre.damageApplied) {
                            inimigos.forEach(enemy => {
                                const dist = Math.hypot(torre.x - centroAlvoX(enemy), torre.y - centroAlvoY(enemy));
                                if (dist < capData.missileExplosionRadius) {
                                    enemy.hp -= capData.missileAoeDamage;
                                    enemy.ultimoAtacante = torre;
                                }
                            });
                            if (torre.humanMissileTarget) {
                                torre.humanMissileTarget.hp -= capData.missileDamage;
                                torre.humanMissileTarget.ultimoAtacante = torre;
                            }

                            efeitosVisuais.push({
                                tipo: 'explosaoCapMarvelMissile',
                                x: torre.x,
                                y: torre.y,
                                raio: capData.missileExplosionRadius,
                                inicio: Date.now(),
                                duracao: 500,
                                color: capData.missileVisualColor
                            });
                            torre.damageApplied = true;

                            torre.isHumanMissileActive = false;
                            torre.x = torre.originalX;
                            torre.y = torre.originalY;
                            torre.humanMissileTarget = null;
                            torre.missileElapsedTime = 0;
                        }
                    }
                } else if (torre.tipo === 'noturno') { // Nightcrawler cooldowns
                    if (torre.danceCooldownCurrent > 0) torre.danceCooldownCurrent -= deltaTime;
                    if (torre.teleportCooldownCurrent > 0) torre.teleportCooldownCurrent -= deltaTime;

                    if (torre.isDancing) {
                        torre.danceTimer -= deltaTime;
                        if (torre.danceTimer <= 0) {
                            torre.isDancing = false;
                            console.log('Noturno terminou a Dança Noturna.');
                        }
                    }
                }
                if (torre.tempBuffEndTime && Date.now() > torre.tempBuffEndTime) {
                    torre.tempDamageBuff = 0;
                    torre.tempAttackSpeedBuff = 0;
                    torre.tempBuffEndTime = 0;
                }
            });

            lokiVariantDrones.forEach(variant => {
                if (variant.cooldown > 0) variant.cooldown -= deltaTime;
                if (Date.now() - variant.spawnTime > variant.lifetime) {
                    const index = lokiVariantDrones.indexOf(variant);
                    if (index > -1) lokiVariantDrones.splice(index, 1);
                }
            });
        }

        function atacar(deltaTime) {
            torres.forEach(torre => {
                const dados = towerData[torre.tipo];
                if (!dados || torre.isDestroyed || (torre.tipo === 'ultron' && torre.isReconstructing)) { return; }

                if (torre.tipo === 'captainmarvel' && torre.isHumanMissileActive) {
                    return;
                }

                let effectiveCooldown = dados.cooldownBase;
                let effectiveDamage = dados.dano;

                if (torre.tempAttackSpeedBuff > 0) {
                    effectiveCooldown *= (1 - torre.tempAttackSpeedBuff);
                }
                if (torre.tempDamageBuff > 0) {
                    effectiveDamage *= (1 + torre.tempDamageBuff);
                }

                if (torre.tipo === 'ironman') {
                    if (!torre.isFlying || !torre.flightTarget || inimigos.findIndex(e => e.id === torre.flightTarget.id) === -1) {
                        let strongestEnemy = null;
                        let highestHp = -1;
                        let furthestX = -1;

                        inimigos.forEach(e => {
                            if (e.hp > highestHp || (e.hp === highestHp && e.x > furthestX)) {
                                highestHp = e.hp;
                                furthestX = e.x;
                                strongestEnemy = e;
                            }
                        });

                        if (strongestEnemy) {
                            if (!torre.isFlying) {
                                torre.flightCooldown = dados.flightCooldownBase;
                            }
                            torre.isFlying = true;
                            torre.flightTarget = strongestEnemy;
                            torre.flightOrbitAngle = Math.atan2(torre.y - centroAlvoY(strongestEnemy), torre.x - centroAlvoX(strongestEnemy));
                            torre.x = centroAlvoX(strongestEnemy) + Math.cos(torre.flightOrbitAngle) * dados.flightOrbitRadius;
                            torre.y = centroAlvoY(strongestEnemy) + Math.sin(torre.flightOrbitAngle) * dados.flightOrbitRadius;
                            torre.flightAttackCooldownCurrent = 0;
                        } else {
                            torre.isFlying = false;
                            torre.x = torre.originalX;
                            torre.y = torre.originalY;
                            torre.flightTarget = null;
                            torre.flightCooldown = dados.flightCooldownBase;
                            if (torre.cooldown <= 0) {
                                let alvo = inimigos.find(e => Math.hypot(torre.originalX - centroAlvoX(e), torre.originalY - centroAlvoY(e)) < dados.alcance);
                                if (alvo) {
                                    efeitosVisuais.push({ tipo: 'laser', x: torre.originalX, y: torre.originalY, tx: centroAlvoX(alvo), ty: centroAlvoY(alvo), duracao: 150, inicio: Date.now(), cor: 'rgba(255, 60, 0, 0.8)', largura: 3 });
                                    alvo.hp -= dados.dano; alvo.ultimoAtacante = torre;
                                    if (torre.unibeamCooldownAtual <= 0) torre.unibeamCharge++;
                                    torre.cooldown = effectiveCooldown;
                                }
                            }
                            return;
                        }
                    }

                    if (torre.isFlying && torre.flightTarget) {
                        const targetX = centroAlvoX(torre.flightTarget);
                        const targetY = centroAlvoY(torre.flightTarget);

                        const distToTarget = Math.hypot(torre.x - targetX, torre.y - targetY);
                        let angleToTarget = Math.atan2(torre.y - targetY, torre.x - targetX);

                        const angleIncrement = (dados.flightOrbitSpeed / dados.flightOrbitRadius) * (deltaTime / 1000);
                        angleToTarget = (angleToTarget + angleIncrement) % (Math.PI * 2);

                        const desiredX = targetX + Math.cos(angleToTarget) * dados.flightOrbitRadius;
                        const desiredY = targetY + Math.sin(angleToTarget) * dados.flightOrbitRadius;

                        const currentDistToDesired = Math.hypot(desiredX - torre.x, desiredY - torre.y);
                        const moveAmount = dados.flightOrbitSpeed * (deltaTime / 1000);

                        if (currentDistToDesired > moveAmount) {
                            const moveAngle = Math.atan2(desiredY - torre.y, desiredX - torre.x);
                            torre.x += Math.cos(moveAngle) * moveAmount;
                            torre.y += Math.sin(moveAngle) * moveAmount;
                        } else {
                            torre.x = desiredX;
                            torre.y = desiredY;
                        }

                        if (torre.flightAttackCooldownCurrent <= 0) {
                            efeitosVisuais.push({
                                tipo: 'laser',
                                x: torre.x,
                                y: torre.y,
                                tx: targetX,
                                ty: targetY,
                                duracao: 100,
                                inicio: Date.now(),
                                cor: 'rgba(0, 191, 255, 0.8)',
                                largura: 3
                            });
                            torre.flightTarget.hp -= effectiveDamage;
                            torre.flightTarget.ultimoAtacante = torre;
                            torre.flightAttackCooldownCurrent = dados.flightAttackCooldown;
                        }

                        if (torre.unibeamCharge >= dados.cargaMaxUnibeam && torre.unibeamCooldownAtual <= 0) {
                            const angulo = Math.atan2(targetY - torre.y, targetX - torre.x);
                            efeitosVisuais.push({ tipo: 'unibeam', x: torre.x, y: torre.y, angulo, duracao: 300, inicio: Date.now() });
                            inimigos.forEach(inimigoNaLinha => {
                                const dx = centroAlvoX(inimigoNaLinha) - torre.x;
                                const dy = centroAlvoY(inimigoNaLinha) - torre.y;
                                const projecao = (dx * Math.cos(angulo)) + (dy * Math.sin(angulo));
                                if (projecao > 0) {
                                    const distDaLinha = Math.abs(dx * Math.sin(angulo) - dy * Math.cos(angulo));
                                    if (distDaLinha < 20) {
                                        inimigoNaLinha.hp -= dados.danoUnibeam; inimigoNaLinha.ultimoAtacante = torre;
                                    }
                                }
                            });
                            torre.unibeamCharge = 0;
                            torre.unibeamCooldownAtual = 5000;
                        } else if (torre.unibeamCooldownAtual <= 0) {
                            torre.unibeamCharge++;
                        }
                    }
                }
                else if (torre.tipo === 'thor') {
                    if (torre.cooldown <= 0) {
                        let alvoPrimario = inimigos.find(e => Math.hypot(torre.x - centroAlvoX(e), torre.y - centroAlvoY(e)) < dados.alcance);
                        if (alvoPrimario) {
                            efeitosVisuais.push({ tipo: 'raioComplexo', pontoInicial: { x: torre.x, y: torre.y }, pontoFinal: { x: centroAlvoX(alvoPrimario), y: centroAlvoY(alvoPrimario) }, duracao: 200, inicio: Date.now() });
                            alvoPrimario.hp -= effectiveDamage; alvoPrimario.ultimoAtacante = torre;
                            
                            if (Math.random() < dados.stunChance && !(alvoPrimario.isDebuffImmune && alvoPrimario.debuffImmuneEndTime > Date.now()) && !alvoPrimario.isStunned) {
                                alvoPrimario.isStunned = true;
                                alvoPrimario.stunTimer = dados.stunDuration;
                                efeitosVisuais.push({ tipo: 'stunEffect', x: centroAlvoX(alvoPrimario), y: centroAlvoY(alvoPrimario), duracao: dados.stunDuration, inicio: Date.now() });
                            }

                            let alvosAtingidos = [alvoPrimario.id]; let ultimoAlvo = alvoPrimario;
                            for (let count = 0; count < 2; count++) {
                                let alvoSecundario = inimigos.find(e => !alvosAtingidos.includes(e.id) && Math.hypot(centroAlvoX(ultimoAlvo) - centroAlvoX(e), centroAlvoY(ultimoAlvo) - centroAlvoY(e)) < 120);
                                if (alvoSecundario) {
                                    efeitosVisuais.push({ tipo: 'raioComplexo', pontoInicial: { x: centroAlvoX(ultimoAlvo), y: centroAlvoY(ultimoAlvo) }, pontoFinal: { x: centroAlvoX(alvoSecundario), y: centroAlvoY(alvoSecundario) }, duracao: 200, inicio: Date.now()});
                                    alvoSecundario.hp -= effectiveDamage * 0.7; alvoSecundario.ultimoAtacante = torre;
                                    alvosAtingidos.push(alvoSecundario.id); ultimoAlvo = alvoSecundario;
                                    if (Math.random() < dados.stunChance * 0.5 && !(alvoSecundario.isDebuffImmune && alvoSecundario.debuffImmuneEndTime > Date.now()) && !alvoSecundario.isStunned) {
                                        alvoSecundario.isStunned = true;
                                        alvoSecundario.stunTimer = dados.stunDuration;
                                        efeitosVisuais.push({ tipo: 'stunEffect', x: centroAlvoX(alvoSecundario), y: centroAlvoY(alvoSecundario), duracao: dados.stunDuration, inicio: Date.now() });
                                    }
                                } else break;
                            }
                            torre.cooldown = effectiveCooldown;
                        }
                    }
                    if (torre.mjolnirCooldown <= 0) {
                        let alvoDistante = null; let maxDist = 0;
                        inimigos.forEach(e => {
                            let dist = Math.hypot(torre.x - centroAlvoX(e), torre.y - centroAlvoY(e));
                            if (dist < dados.alcance * 2.5 && dist > maxDist) { maxDist = dist; alvoDistante = e; }
                        });
                        if (alvoDistante) {
                            projetis.push({ tipo: 'mjolnir', x: torre.x, y: torre.y, tx: centroAlvoX(alvoDistante), ty: centroAlvoY(alvoDistante), vel: 12, rotation: Math.random() * Math.PI * 2, dano: dados.danoMjolnir, dono: torre, acertados: [], estado: 'ida', id: Date.now(), raioColisao: 15 });
                            torre.mjolnirCooldown = dados.cooldownMjolnirBase;
                        }
                    }
                }
                else if (torre.tipo === 'emma') {
                    if (torre.modo === 'diamante') {
                        if (torre.cooldownOndaAtual <= 0) {
                            inimigos.forEach(inimigo => {
                                if (Math.hypot(torre.x - centroAlvoX(inimigo), torre.y - centroAlvoY(inimigo)) < dados.zonaOndaDiamante) {
                                    inimigo.hp -= dados.danoOndaDiamante; inimigo.ultimoAtacante = torre;
                                }
                            });
                            torre.cooldownOndaAtual = dados.cooldownOndaDiamante;
                            efeitosVisuais.push({ tipo: 'ondaEmma', x: torre.x, y: torre.y, raio: dados.zonaOndaDiamante, inicio: Date.now(), duracao: 600 });
                        }
                        if (torre.novaCooldownCurrent <= 0) {
                            torre.novaCooldownCurrent = dados.novaCooldown;
                            const numShards = dados.novaShards;
                            const angleStep = (Math.PI * 2) / numShards;

                            for (let i = 0; i < numShards; i++) {
                                const angle = i * angleStep + (Math.random() - 0.5) * 0.1;
                                const finalX = torre.x + Math.cos(angle) * (dados.novaProjectileSpeed * 60);
                                const finalY = torre.y + Math.sin(angle) * (dados.novaProjectileSpeed * 60);

                                projetis.push({
                                    tipo: 'diamondShard',
                                    x: torre.x,
                                    y: torre.y,
                                    tx: finalX,
                                    ty: finalY,
                                    vel: dados.novaProjectileSpeed,
                                    dano: dados.novaDamage,
                                    dono: torre,
                                    acertados: [],
                                    id: Date.now() + Math.random() + "_shard_" + i,
                                    raioColisao: 10,
                                    rotacao: angle,
                                    lifespan: 500,
                                    spawnTime: Date.now()
                                });
                            }
                            console.log('Emma ativou Impacto de Diamante (automático)!');
                        }
                    } else {
                        inimigos.forEach(inimigo => {
                            if (Math.hypot(torre.x - centroAlvoX(inimigo), torre.y - centroAlvoY(inimigo)) < dados.zona && !(inimigo.isDebuffImmune && inimigo.debuffImmuneEndTime > Date.now())) {
                                if (!inimigo.isConfuso) {
                                    if (Math.random() < dados.chanceConfusao) {
                                        inimigo.isConfuso = true;
                                        inimigo.timerConfusao = dados.duracaoConfusao;
                                        efeitosVisuais.push({ tipo: 'psi', x: torre.x, y: torre.y, tx: centroAlvoX(inimigo), ty: centroAlvoY(inimigo), duracao: 400, inicio: Date.now() });
                                    }
                                }
                            }
                        });
                        torre.cooldown = effectiveCooldown;
                    }
                }
                else if (torre.tipo === 'redhulk') {
                    if (torre.isAuraActive) {
                        const dadosRedHulk = towerData.redhulk;
                        if (Date.now() - torre.lastAuraTickTime > dadosRedHulk.auraTickRate) {
                            inimigos.forEach(inimigo => {
                                const dist = Math.hypot(torre.x - centroAlvoX(inimigo), torre.y - centroAlvoY(inimigo));
                                if (dist < dadosRedHulk.auraRadius) {
                                    inimigo.hp -= dadosRedHulk.auraDamagePerTick;
                                    inimigo.ultimoAtacante = torre;
                                    efeitosVisuais.push({ tipo: 'laser', x: centroAlvoX(inimigo), y: centroAlvoY(inimigo), tx: centroAlvoX(inimigo) + (Math.random() - 0.5) * 10, ty: centroAlvoY(inimigo) + (Math.random() - 0.5) * 10, duracao: 50, inicio: Date.now(), cor: 'rgba(255, 100, 0, 0.7)', largura: 1 });
                                }
                            });
                            const numAuraParticles = 3 + Math.floor(Math.random() * 3);
                            for (let i = 0; i < numAuraParticles; i++) {
                                const angle = Math.random() * Math.PI * 2;
                                const speed = Math.random() * 20 + 20;
                                const size = Math.random() * 2 + 1;
                                efeitosVisuais.push({
                                    tipo: 'auraFireParticle',
                                    x: torre.x,
                                    y: torre.y,
                                    dx: Math.cos(angle) * speed,
                                    dy: Math.sin(angle) * speed,
                                    tamanho: size,
                                    cor: `rgba(255, ${Math.floor(Math.random() * 150 + 100)}, 0, 1)`,
                                    duracao: 300 + Math.random() * 300,
                                    inicio: Date.now(),
                                });
                            }
                            torre.lastAuraTickTime = Date.now();
                        }
                    }

                    if (Date.now() - (torre.ultimoPoder || 0) > dados.cooldown) {
                        let inimigoProximo = inimigos.find(e => Math.hypot(torre.x - centroAlvoX(e), torre.y - centroAlvoY(e)) < torre.raioAtual);
                        if (inimigoProximo) {
                            torre.ultimoPoder = Date.now(); const raioExplosao = torre.raioAtual; const danoExplosao = torre.danoAtual * 2;
                            efeitosVisuais.push({ tipo: 'explosaoRedHulk', x: torre.x, y: torre.y, raio: raioExplosao, inicio: Date.now(), duracao: 700, particulas: gerarParticulasExplosao(torre.x, torre.y, raioExplosao) });
                            inimigos.forEach(inimigo => {
                                if (Math.hypot(torre.x - centroAlvoX(inimigo), torre.y - centroAlvoY(inimigo)) < raioExplosao) {
                                    inimigo.hp -= danoExplosao; inimigo.ultimoAtacante = torre;
                                }
                            });
                        }
                    }
                }
                else if (torre.tipo === 'ultron') {
                    if (torre.spawnCooldown <= 0) {
                        const currentUltronDrones = drones.filter(d => d.spawnerId === torre.id).length;
                        if (currentUltronDrones < dados.maxDrones) {
                            let newDroneX, newDroneY;
                            let foundSpot = false;
                            const maxAttempts = 20;
                            const droneRadius = dados.droneSize;
                            const ultronRadius = 25;

                            for (let i = 0; i < maxAttempts; i++) {
                                const angle = Math.random() * Math.PI * 2;
                                const distance = Math.random() * dados.droneSpawnRadius;
                                newDroneX = torre.x + Math.cos(angle) * distance;
                                newDroneY = torre.y + Math.sin(angle) * distance;

                                const distToUltron = Math.hypot(newDroneX - torre.x, newDroneY - torre.y);
                                if (distToUltron < droneRadius + ultronRadius) {
                                    continue;
                                }

                                let overlapsWithOtherDrone = false;
                                for (const otherDrone of drones) {
                                    const distToOtherDrone = Math.hypot(newDroneX - otherDrone.x, newDroneY - otherDrone.y);
                                    if (distToOtherDrone < droneRadius * 2) {
                                        overlapsWithOtherDrone = true;
                                        break;
                                    }
                                }

                                if (!overlapsWithOtherDrone) {
                                    foundSpot = true;
                                    break;
                                }
                            }

                            if (foundSpot) {
                                drones.push({
                                    x: newDroneX, y: newDroneY,
                                    mode: 'sentinel',
                                    cooldown: towerData.ultron.droneLaserCooldown,
                                    id: Date.now() + Math.random() + "_drone",
                                    spawnerId: torre.id,
                                    spawnTime: Date.now(),
                                    target: null,
                                });
                                torre.spawnCooldown = dados.spawnCooldownBase;
                            }
                        }
                    }

                    drones.filter(d => d.spawnerId === torre.id && d.mode === 'sentinel').forEach(drone => {
                        if (drone.cooldown <= 0) {
                            let alvoDrone = inimigos.find(e => Math.hypot(drone.x - centroAlvoX(e), drone.y - centroAlvoY(e)) < dados.droneLaserRange);
                            if (alvoDrone) {
                                projetis.push({
                                    tipo: 'droneLaserProjectile',
                                    x: drone.x,
                                    y: drone.y,
                                    tx: centroAlvoX(alvoDrone),
                                    ty: centroAlvoY(alvoDrone),
                                    vel: 20,
                                    dano: dados.droneLaserDamage,
                                    dono: torre,
                                    acertados: [],
                                    id: Date.now() + Math.random(),
                                    raioColisao: 5,
                                    color: dados.droneLaserColor,
                                    width: 2,
                                    lifespan: 100,
                                    spawnTime: Date.now(),
                                });
                                drone.cooldown = dados.droneLaserCooldown;
                            }
                        }
                    });

                    if (torre.nanobotInfestationCooldownCurrent <= 0 && !torre.nanobotInfestationTarget) {
                        let potentialTarget = inimigos.find(e => Math.hypot(torre.x - centroAlvoX(e), torre.y - centroAlvoY(e)) < dados.nanobotRange);
                        if (potentialTarget) {
                            torre.nanobotInfestationTarget = potentialTarget;
                            torre.nanobotInfestationEndTime = Date.now() + dados.nanobotInfestationDuration;
                            torre.lastNanobotTickTime = Date.now();
                            potentialTarget.isInfested = true;
                            potentialTarget.nanobotInfestationTimer = dados.nanobotInfestationDuration;
                            potentialTarget.nanobotDamageReduction = dados.armorReductionFactor;
                            console.log('Ultron ativou Infestação de Nanos!');
                            efeitosVisuais.push({ tipo: 'nanobotCloud', x: torre.x, y: torre.y, tx: centroAlvoX(potentialTarget), ty: centroAlvoY(potentialTarget), duracao: 500, inicio: Date.now() });
                        }
                    }

                    if (torre.satelliteStrikeCooldownCurrent <= 0) {
                        let targetEnemy = null;
                        let furthestX = -1;
                        inimigos.forEach(e => {
                            if (e.x > furthestX) {
                                furthestX = e.x;
                                targetEnemy = e;
                            }
                        });

                        if (targetEnemy) {
                            torre.satelliteStrikeCooldownCurrent = dados.satelliteStrikeCooldown;
                            efeitosVisuais.push({
                                tipo: 'satelliteStrike',
                                x: centroAlvoX(targetEnemy),
                                y: centroAlvoY(targetEnemy),
                                raio: dados.satelliteStrikeRadius,
                                dano: dados.satelliteStrikeDamage,
                                hackChance: dados.hackChanceOnDeath,
                                dono: torre,
                                duracao: 1500,
                                inicio: Date.now()
                            });
                            console.log('Ultron ativou Controle de Satélite!');
                        }
                    }
                }
                else if (torre.tipo === 'captainmarvel') {
                    if (torre.cooldown <= 0) {
                        let alvo = null; let maiorDistanciaNoAlcance = 0;
                        inimigos.forEach(e => {
                            const dist = Math.hypot(torre.x - centroAlvoX(e), torre.y - centroAlvoY(e));
                            if (dist >= dados.alcanceMin && dist <= dados.alcanceMax) {
                                if (dist > maiorDistanciaNoAlcance) {
                                    maiorDistanciaNoAlcance = dist;
                                    alvo = e;
                                }
                            }
                        });
                        if (alvo) {
                            efeitosVisuais.push({ tipo: 'laser', x: torre.x, y: torre.y, tx: centroAlvoX(alvo), ty: centroAlvoY(alvo), duracao: 200, inicio: Date.now(), cor: '#FFD700', largura: 4 });
                            alvo.hp -= dados.dano; alvo.ultimoAtacante = torre;
                            torre.cooldown = effectiveCooldown;
                        }
                    }
                }
                else if (torre.tipo === 'gaviaoarqueiro') {
                    if (torre.cooldown <= 0) {
                        let alvo = null;
                        let maxDistOnScreen = -1;
                        inimigos.forEach(e => {
                            const distToEnd = Math.hypot(canvas.width - centroAlvoX(e), centroAlvoY(e) - (canvas.height / 2));
                            if (distToEnd > maxDistOnScreen) {
                                maxDistOnScreen = distToEnd;
                                alvo = e;
                            }
                        });

                        if (alvo) {
                            const randomIndex = Math.floor(Math.random() * dados.arrowTypes.length);
                            const currentArrowType = dados.arrowTypes[randomIndex];
                            
                            if (currentArrowType === 'triple') {
                                const numArrows = 3;
                                const baseAngle = Math.atan2(centroAlvoY(alvo) - torre.y, centroAlvoX(alvo) - torre.x);
                                const spreadAngle = 0.1;

                                for (let k = 0; k < numArrows; k++) {
                                    const angleOffset = (k - (numArrows - 1) / 2) * spreadAngle;
                                    const arrowAngle = baseAngle + angleOffset;
                                    const arrowProps = dados.arrowProperties.triple;

                                    const endX = torre.x + Math.cos(arrowAngle) * (canvas.width + canvas.height);
                                    const endY = torre.y + Math.sin(arrowAngle) * (canvas.width + canvas.height);

                                    projetis.push({
                                        tipo: `hawkeyeArrow_triple`,
                                        x: torre.x,
                                        y: torre.y,
                                        tx: endX,
                                        ty: endY,
                                        vel: arrowProps.vel,
                                        dano: arrowProps.dano,
                                        dono: torre,
                                        acertados: [],
                                        id: Date.now() + Math.random() + "_triple_arrow_" + k,
                                        raioColisao: arrowProps.raioColisao,
                                        color: arrowProps.color,
                                        width: arrowProps.width,
                                    });
                                }
                            } else {
                                const arrowProps = dados.arrowProperties[currentArrowType];
                                projetis.push({
                                    tipo: `hawkeyeArrow_${currentArrowType}`,
                                    x: torre.x,
                                    y: torre.y,
                                    tx: centroAlvoX(alvo),
                                    ty: centroAlvoY(alvo),
                                    vel: arrowProps.vel,
                                    dano: arrowProps.dano,
                                    dono: torre,
                                    acertados: [],
                                    id: Date.now() + Math.random(),
                                    raioColisao: arrowProps.raioColisao,
                                    color: arrowProps.color,
                                    width: arrowProps.width,
                                    explosionRadius: arrowProps.explosionRadius,
                                    explosionDamage: arrowProps.explosionDamage,
                                    stunDuration: arrowProps.stunDuration,
                                    poisonDuration: arrowProps.poisonDuration,
                                    poisonTickRate: arrowProps.poisonTickRate,
                                    poisonDamagePerTick: arrowProps.poisonDamagePerTick,
                                });
                            }
                            torre.cooldown = effectiveCooldown;
                        }
                    }
                }
                else if (torre.tipo === 'loki') {
                    let currentDamage = dados.danoBasePunhal;
                    let currentCooldown = dados.cooldownBase;
                    let currentStunChance = 0;
                    let currentStunDuration = 0;
                    let halfHpOnHitEnabled = dados.halfHpOnHit;
                    let poisonDuration = dados.poisonDuration;
                    let poisonTickRate = dados.poisonTickRate;
                    let poisonDamagePerTick = dados.poisonDamagePerTick;
                    let poisonChance = dados.poisonDaggerChance;


                    if (torre.isShapeshiftActive && torre.copiedTowerType) {
                        currentDamage = torre.copiedDamage;
                        currentCooldown = torre.copiedCooldown;
                        currentStunChance = torre.copiedStunChance || 0;
                        currentStunDuration = torre.copiedStunDuration || 0;
                        halfHpOnHitEnabled = false;
                        poisonDuration = 0;
                        poisonTickRate = 0;
                        poisonDamagePerTick = 0;
                        poisonChance = 0;
                    }

                    if (torre.cooldown <= 0) {
                        let alvo = null;
                        let furthestX = -1;
                        inimigos.forEach(e => {
                            if (e.x > furthestX) {
                                furthestX = e.x;
                                alvo = e;
                            }
                        });

                        if (alvo) {
                            projetis.push({
                                tipo: torre.isShapeshiftActive && torre.copiedTowerType === 'thor' ? 'mjolnir' : 'lokiPoisonDagger',
                                x: torre.x,
                                y: torre.y,
                                tx: centroAlvoX(alvo),
                                ty: centroAlvoY(alvo),
                                vel: 15,
                                dano: currentDamage,
                                dono: torre,
                                acertados: [],
                                id: Date.now() + Math.random(),
                                raioColisao: 8,
                                color: torre.isShapeshiftActive && torre.copiedTowerType === 'thor' ? 'blue' : 'purple',
                                poisonChance: poisonChance,
                                poisonDuration: poisonDuration,
                                poisonTickRate: poisonTickRate,
                                poisonDamagePerTick: poisonDamagePerTick,
                                halfHpOnHit: halfHpOnHitEnabled,
                                stunChance: currentStunChance,
                                stunDuration: currentStunDuration,
                            });
                            torre.cooldown = currentCooldown;
                        }
                    }
                }
                else if (torre.tipo === 'usagent') {
                    if (torre.isCharging) {
                        torre.chargeElapsedTime += deltaTime;
                        const totalChargeDistance = Math.hypot(torre.chargeTargetX - torre.chargeStartX, torre.chargeTargetY - torre.chargeStartY);
                        const chargeProgress = totalChargeDistance > 0 ? Math.min(torre.chargeElapsedTime / torre.chargeDuration, 1) : 1;

                        if (chargeProgress < 1) {
                            torre.x = torre.chargeStartX + (torre.chargeTargetX - torre.chargeStartX) * chargeProgress;
                            torre.y = torre.chargeStartY + (torre.chargeTargetY - torre.chargeStartY) * chargeProgress;
                        } else {
                            torre.isCharging = false;
                            torre.x = torre.chargeTargetX;
                            torre.y = torre.chargeTargetY;
                            inimigos.forEach(inimigo => {
                                const dist = Math.hypot(torre.x - centroAlvoX(inimigo), torre.y - centroAlvoY(inimigo));
                                if (dist < towerData.usagent.chargeRadius) {
                                    inimigo.hp -= dados.chargeDamage;
                                    inimigo.ultimoAtacante = torre;
                                    const angleFromUSAgent = Math.atan2(centroAlvoY(inimigo) - torre.y, centroAlvoX(inimigo) - torre.x);
                                    inimigo.x += Math.cos(angleFromUSAgent) * dados.chargeKnockback;
                                    inimigo.y += Math.sin(angleFromUSAgent) * dados.chargeKnockback;

                                    if (Math.random() < dados.chargeStunChance && !(inimigo.isDebuffImmune && inimigo.debuffImmuneEndTime > Date.now())) {
                                        inimigo.isStunned = true;
                                        inimigo.stunTimer = dados.chargeStunDuration;
                                        efeitosVisuais.push({ tipo: 'stunEffect', x: centroAlvoX(inimigo), y: centroAlvoY(inimigo), duracao: dados.chargeStunDuration, inicio: Date.now() });
                                    }
                                }
                            });
                            efeitosVisuais.push({ tipo: 'usagentShockwave', x: torre.x, y: torre.y, raio: towerData.usagent.chargeRadius, inicio: Date.now(), duracao: 400 });
                        }
                        return;
                    }

                    if (torre.cooldown <= 0) {
                        let alvo = inimigos.find(e => Math.hypot(torre.x - centroAlvoX(e), torre.y - centroAlvoY(e)) < dados.alcance);
                        if (alvo) {
                            projetis.push({
                                tipo: 'usagentBullet',
                                x: torre.x,
                                y: torre.y,
                                tx: centroAlvoX(alvo),
                                ty: centroAlvoY(alvo),
                                vel: 15,
                                dano: effectiveDamage,
                                dono: torre,
                                acertados: [],
                                id: Date.now() + Math.random() + "_usagent_bullet",
                                raioColisao: dados.chargeProjectileSize / 2,
                                color: dados.chargeProjectileColor,
                                size: dados.chargeProjectileSize
                            });
                            torre.cooldown = effectiveCooldown;
                        }
                    }
                }
                else if (torre.tipo === 'captainamerica') {
                    if (torre.cooldown <= 0) {
                        let alvo = null;
                        let furthestX = -1;
                        inimigos.forEach(e => {
                            if (e.x > furthestX && Math.hypot(torre.x - centroAlvoX(e), torre.y - centroAlvoY(e)) < dados.alcance) {
                                furthestX = e.x;
                                alvo = e;
                            }
                        });

                        if (alvo) {
                            projetis.push({
                                tipo: 'capShield',
                                x: torre.x,
                                y: torre.y,
                                tx: centroAlvoX(alvo),
                                ty: centroAlvoY(alvo),
                                vel: 15,
                                dano: effectiveDamage,
                                dono: torre,
                                bouncesLeft: dados.ricochetMaxBounces,
                                maxBounces: dados.ricochetMaxBounces,
                                ricochetChainRadius: dados.ricochetChainRadius,
                                acertados: [alvo.id],
                                id: Date.now() + Math.random() + "_cap_shield",
                                raioColisao: 15,
                                rotation: 0,
                                estado: 'ida',
                            });
                            torre.cooldown = effectiveCooldown;
                        }
                    }
                }
                else if (torre.tipo === 'wanda') {
                    if (torre.cooldown <= 0) {
                        let alvo = inimigos.find(e => Math.hypot(torre.x - centroAlvoX(e), torre.y - centroAlvoY(e)) < dados.alcance);
                        if (alvo && Math.random() < dados.illusionChance) {
                            projetis.push({
                                tipo: 'wandaIllusionPulse',
                                x: torre.x,
                                y: torre.y,
                                tx: centroAlvoX(alvo),
                                ty: centroAlvoY(alvo),
                                vel: 10,
                                dano: dados.illusionDamage,
                                dono: torre,
                                acertados: [],
                                id: Date.now() + Math.random() + "_wanda_illusion",
                                raioColisao: 10,
                                lifespan: 500,
                                spawnTime: Date.now(),
                                illusionConfuseDuration: dados.illusionConfuseDuration,
                                size: 40
                            });
                            torre.cooldown = effectiveCooldown;
                        } else if (alvo) {
                            torre.cooldown = effectiveCooldown;
                        }
                    }
                }
                else if (torre.tipo === 'noturno') { // Nightcrawler attacks
                    if (torre.isDancing) {
                        const dadosNoturno = towerData.noturno;
                        if (Date.now() - torre.lastDanceTickTime > dadosNoturno.danceTickRate) {
                            inimigos.forEach(inimigo => {
                                const dist = Math.hypot(torre.x - centroAlvoX(inimigo), torre.y - centroAlvoY(inimigo));
                                if (dist < dadosNoturno.danceRadius) {
                                    inimigo.hp -= dadosNoturno.danceDamagePerTick;
                                    inimigo.ultimoAtacante = torre;

                                    // Knockback
                                    const angleFromNoturno = Math.atan2(centroAlvoY(inimigo) - torre.y, centroAlvoX(inimigo) - torre.x);
                                    inimigo.x += Math.cos(angleFromNoturno) * dadosNoturno.danceKnockbackAmount;
                                    inimigo.y += Math.sin(angleFromNoturno) * dadosNoturno.danceKnockbackAmount;

                                    // Bleeding
                                    if (Math.random() < dadosNoturno.bleedChance && !(inimigo.isDebuffImmune && inimigo.debuffImmuneEndTime > Date.now())) {
                                        inimigo.isBleeding = true;
                                        inimigo.bleedTimer = dadosNoturno.bleedDuration;
                                        inimigo.lastBleedTick = Date.now();
                                        inimigo.bleedDamagePerTick = dadosNoturno.bleedDamagePerTick;
                                    }
                                    // Disarm
                                    if (Math.random() < dadosNoturno.disarmChance && !(inimigo.isDebuffImmune && inimigo.debuffImmuneEndTime > Date.now())) {
                                        inimigo.isDisarmed = true;
                                        inimigo.disarmTimer = dadosNoturno.disarmDuration;
                                    }

                                    // Visual for sword cuts
                                    efeitosVisuais.push({
                                        tipo: 'swordCut',
                                        x: centroAlvoX(inimigo),
                                        y: centroAlvoY(inimigo),
                                        angle: Math.random() * Math.PI * 2,
                                        duracao: 150,
                                        inicio: Date.now()
                                    });
                                }
                            });
                            // Small bamf effect on each tick of dance
                            efeitosVisuais.push({
                                tipo: 'bamf',
                                x: torre.x + (Math.random() - 0.5) * 10,
                                y: torre.y + (Math.random() - 0.5) * 10,
                                color: 'blue',
                                duracao: 100,
                                inicio: Date.now(),
                            });
                            torre.lastDanceTickTime = Date.now();
                        }
                    }
                    // Nightcrawler does not have a standard auto-attack outside of Dance
                }
                else if (dados.alcance > 0 && torre.cooldown <= 0) {
                    let alvo = inimigos.find(e => Math.hypot(torre.x - centroAlvoX(e), torre.y - centroAlvoY(e)) < dados.alcance);
                    if (alvo) {
                        alvo.hp -= effectiveDamage; alvo.ultimoAtacante = torre;
                        torre.cooldown = effectiveCooldown;
                        let corLaser = 'rgba(200,0,200,0.7)';
                        efeitosVisuais.push({ tipo: 'laser', x: torre.x, y: torre.y, tx: centroAlvoX(alvo), ty: centroAlvoY(alvo), duracao: 100, inicio: Date.now(), cor: corLaser, largura: 2 });
                    }
                }
            });

            lokiVariantDrones.forEach(variant => {
                if (variant.cooldown <= 0) {
                    let targetEnemy = inimigos.find(e => Math.hypot(variant.x - centroAlvoX(e), variant.y - centroAlvoY(e)) < 150);
                    if (targetEnemy) {
                        targetEnemy.hp -= variant.damage;
                        efeitosVisuais.push({ tipo: 'laser', x: variant.x, y: variant.y, tx: centroAlvoX(targetEnemy), ty: centroAlvoY(targetEnemy), duracao: 80, inicio: Date.now(), cor: 'rgba(255, 100, 255, 0.7)', largura: 1.5 });

                        const applyDebuff = !(targetEnemy.isDebuffImmune && targetEnemy.debuffImmuneEndTime > Date.now());
                        if (applyDebuff) {
                            if (variant.effectType === 'slow') {
                                targetEnemy.isSlowed = true;
                                targetEnemy.slowFactor = variant.effectValue;
                                targetEnemy.slowEndTime = Date.now() + 2000;
                                efeitosVisuais.push({ tipo: 'slowEffect', x: centroAlvoX(targetEnemy), y: centroAlvoY(targetEnemy), raio: 20, duracao: 2000, inicio: Date.now(), color: 'rgba(128, 0, 128, 0.4)' });
                            } else if (variant.effectType === 'stun') {
                                targetEnemy.isStunned = true;
                                targetEnemy.stunTimer = 1000;
                                efeitosVisuais.push({ tipo: 'stunEffect', x: centroAlvoX(targetEnemy), y: centroAlvoY(targetEnemy), duracao: 1000, inicio: Date.now() });
                            }
                        }
                        variant.cooldown = 1500;
                    }
                }
            });
        }

        function gerarParticulasExplosao(x, y, raioMax, baseColor = 'white') {
            const particulas = [];
            const numParticulas = 40 + Math.floor(raioMax / 5);
            for (let i = 0; i < numParticulas; i++) {
                const angulo = Math.random() * 2 * Math.PI;
                const velocidade = Math.random() * 3 + 2 + raioMax * 0.015;
                const tamanho = Math.random() * 3 + 3;
                let color;
                if (baseColor === 'gray') {
                    color = `rgba(${Math.floor(Math.random() * 50 + 150)}, ${Math.floor(Math.random() * 50 + 150)}, ${Math.floor(Math.random() * 50 + 150)}, 1)`;
                } else {
                    color = Math.random() > 0.5 ? `rgba(255,${Math.floor(Math.random() * 150 + 100)},0,1)` : `rgba(${Math.floor(Math.random() * 50 + 100)},${Math.floor(Math.random() * 50)},0,1)`;
                }
                particulas.push({
                    x: x + (Math.random() - 0.5) * 15,
                    y: y + (Math.random() - 0.5) * 15,
                    dx: Math.cos(angulo) * velocidade,
                    dy: Math.sin(angulo) * velocidade,
                    tamanho: tamanho,
                    cor: color
                });
            }
            return particulas;
        }

        function evoluirRedHulk(torre) {
            if (!torre || torre.tipo !== 'redhulk') return;
            const proximoNivel = torre.level + 1; let killsNecessarios = 0;
            if (proximoNivel === 2) killsNecessarios = 10;
            else if (proximoNivel === 3) killsNecessarios = 25;
            else if (proximoNivel === 4) killsNecessarios = 50;
            else return;
            if (torre.killCount >= killsNecessarios) {
                torre.level = proximoNivel; const dadosBase = towerData.redhulk;
                torre.raioAtual = dadosBase.raioBase * (1 + (torre.level - 1) * 0.25);
                torre.danoAtual = dadosBase.danoBase * (1 + (torre.level - 1) * 0.30);
                efeitosVisuais.push({ tipo: 'levelUp', level: torre.level, x: torre.x, y: torre.y, raio: torre.raioAtual, duracao: 1500, inicio: Date.now(), cor: 'rgba(255, 255, 0, 0.7)' });
                console.log(`Red Hulk evoluiu para o nível ${torre.level}! Dano: ${torre.danoAtual.toFixed(1)}, Raio: ${torre.raioAtual.toFixed(1)}`);
                torre.killCount = 0;
            }
        }

        // --- GAME CONTROL FUNCTIONS ---
        function mostrarMsg(texto) {
            const msgBox = document.getElementById('msgBox');
            const msgText = document.getElementById('msgText');
            if (msgBox && msgText) {
                msgText.textContent = texto;
                msgBox.style.display = 'block';
            } else {
                console.warn("Message box elements not found in DOM. Check 'msgBox' and 'msgText'.");
            }
        }

        function fecharMsg() {
            const msgBox = document.getElementById('msgBox');
            if (msgBox) msgBox.style.display = 'none';
        }

        function gerarInimigos(deltaTime) {
            const chanceSpawnBase = 0.01;
            const chanceSpawnPerMs = chanceSpawnBase / (1000 / 60);
            const currentChance = chanceSpawnPerMs * deltaTime + (fase * 0.000005 * deltaTime);

            if (Math.random() < currentChance) {
                const tipo = Math.random() < 0.3 ? 'rápido' : 'normal';
                let hp = tipo === 'rápido' ? (60 + fase * 15) : (100 + fase * 25);
                let vel = tipo === 'rápido' ? (120 + fase * 8) : (70 + fase * 6);
                inimigos.push({
                    id: Date.now() + Math.random() + "_ini_gen",
                    x: -40,
                    y: Math.random() * (canvas.height - 80) + 40,
                    vel,
                    hp,
                    maxHp: hp,
                    isConfuso: false,
                    timerConfusao: 0,
                    isStunned: false,
                    stunTimer: 0,
                    isPoisoned: false,
                    poisonTimer: 0,
                    lastPoisonTick: 0,
                    poisonDamagePerTick: 0,
                    isSlowed: false,
                    slowFactor: 0,
                    slowEndTime: 0,
                    isDebuffImmune: false,
                    debuffImmuneEndTime: 0,
                    isInfested: false,
                    nanobotInfestationTimer: 0,
                    nanobotDamageReduction: 0,
                    isHacked: false,
                    isBleeding: false, // New for bleeding
                    bleedTimer: 0,
                    lastBleedTick: 0,
                    bleedDamagePerTick: 0,
                    isDisarmed: false, // New for disarm
                    disarmTimer: 0,
                });
            }
        }

        function spawnarInimigos() {
            const numInimigos = 5 + fase * 2;
            for (let i = 0; i < numInimigos; i++) {
                inimigos.push({
                    id: Date.now() + Math.random() + "_ini",
                    x: -Math.random() * 200 - 50,
                    y: Math.random() * (canvas.height - 80) + 40,
                    vel: (0.8 + Math.random() * 0.5 + fase * 0.05) * (1000/60),
                    hp: 80 + fase * 20,
                    maxHp: 80 + fase * 20,
                    isConfuso: false,
                    timerConfusao: 0,
                    isStunned: false,
                    stunTimer: 0,
                    isPoisoned: false,
                    poisonTimer: 0,
                    lastPoisonTick: 0,
                    poisonDamagePerTick: 0,
                    isSlowed: false,
                    slowFactor: 0,
                    slowEndTime: 0,
                    isDebuffImmune: false,
                    debuffImmuneEndTime: 0,
                    isInfested: false,
                    nanobotInfestationTimer: 0,
                    nanobotDamageReduction: 0,
                    isHacked: false,
                    isBleeding: false,
                    bleedTimer: 0,
                    lastBleedTick: 0,
                    bleedDamagePerTick: 0,
                    isDisarmed: false,
                    disarmTimer: 0,
                });
            }
        }

        // --- MAIN GAME LOOP ---
        function gameLoop(timestamp) {
            try {
                const deltaTime = Math.min(timestamp - lastFrameTime, 100);
                lastFrameTime = timestamp;

                if (pausado) {
                    requestAnimationFrame(gameLoop);
                    return;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (deltaTime > 0) {
                    gerarInimigos(deltaTime);
                    atualizarInimigos(deltaTime);
                    atualizarProjeteis(deltaTime);
                    atualizarDrones(deltaTime);
                    atualizarCooldownsTorres(deltaTime);
                    atacar(deltaTime);
                }
                desenharInimigos();
                desenharTorres();
                desenharDummyTowers();
                desenharLokiVariantDrones();
                desenharDrones();
                desenharProjeteis();
                desenharEfeitosVisuais(deltaTime);

                for (let i = inimigos.length - 1; i >= 0; i--) {
                    const inimigo = inimigos[i];
                    if (inimigo.hp <= 0) {
                        const torreQueMatou = inimigo.ultimoAtacante;

                        if (inimigo.isHacked) {
                            inimigos.forEach(nearbyEnemy => {
                                const dist = Math.hypot(centroAlvoX(inimigo) - centroAlvoX(nearbyEnemy), centroAlvoY(inimigo) - centroAlvoY(nearbyEnemy));
                                if (dist < 80 && nearbyEnemy.id !== inimigo.id) {
                                    nearbyEnemy.hp -= 30;
                                    nearbyEnemy.ultimoAtacante = inimigo.ultimoAtacante;
                                }
                            });
                            efeitosVisuais.push({ tipo: 'explosaoRedHulk', x: centroAlvoX(inimigo), y: centroAlvoY(inimigo), raio: 80, inicio: Date.now(), duracao: 300, particulas: gerarParticulasExplosao(centroAlvoX(inimigo), centroAlvoY(inimigo), 80, 'gray') });
                        }

                        torres.forEach(torre => {
                            if (torre.tipo === 'captainmarvel') {
                                const capData = towerData.captainmarvel;
                                const distToEnemy = Math.hypot(centroAlvoX(inimigo) - torre.x, centroAlvoY(inimigo) - torre.y);
                                if (distToEnemy < capData.energyAbsorptionRange) {
                                    torre.absorbedEnergy += capData.energyPerKill;
                                    if (inimigo.isHacked) {
                                        torre.absorbedEnergy += capData.energyPerExplosion;
                                    }
                                    torre.absorbedEnergy = Math.min(torre.absorbedEnergy, capData.ultimateChargeNeeded);
                                    if (torre.absorbedEnergy >= capData.ultimateChargeNeeded) {
                                        efeitosVisuais.push({
                                            tipo: 'textPop',
                                            x: torre.x,
                                            y: torre.y - 30,
                                            text: `ULTIMATE PRONTO!`,
                                            color: 'gold',
                                            duracao: 1500,
                                            inicio: Date.now()
                                        });
                                    }
                                }
                            }
                        });


                        if (torreQueMatou && torreQueMatou.tipo === 'redhulk') {
                            torreQueMatou.killCount = (torreQueMatou.killCount || 0) + 1;
                            evoluirRedHulk(torreQueMatou);
                        }
                        dinheiro += 10 + Math.floor(fase / 2);
                        const dinheiroElement = document.getElementById('dinheiro');
                        if (dinheiroElement) {
                            dinheiroElement.textContent = dinheiro;
                        }
                        inimigosDerrotados++;
                        inimigos.splice(i, 1);
                    }
                }
                const inimigosParaProximaFase = 10 + fase * 3;
                if (inimigosDerrotados >= inimigosParaProximaFase) {
                    fase++; inimigosDerrotados = 0;
                    resurrectionsUsedThisPhase = 0;
                    torres.forEach(t => {
                        if (t.tipo === 'ultron') {
                            t.emergencyReplicationUsedThisPhase = false;
                        }
                    });
                    const faseElement = document.getElementById('fase');
                    if (faseElement) {
                        faseElement.textContent = fase;
                    }
                    mostrarMsg(`Fase ${fase}! Novos desafios se aproximam!`);
                }
                const progress = Math.min((inimigosDerrotados / inimigosParaProximaFase) * 100, 100);
                const waveProgressElement = document.getElementById('waveProgress');
                if (waveProgressElement) {
                    waveProgressElement.style.width = progress + '%';
                }

                requestAnimationFrame(gameLoop);
            } catch (e) {
                console.error("Fatal error in gameLoop:", e);
                mostrarMsg(`Fatal error in game: ${e.message}. Check console for details.`);
                pausado = true;
            }
        }

        // --- GAME START ---
        document.addEventListener('DOMContentLoaded', () => {
            const requiredIds = ['gameCanvas', 'menu', 'dinheiro', 'vida', 'fase', 'pausadoMsg', 'msgBox', 'msgText', 'waveProgress'];
            let allElementsExist = true;
            const missingElements = [];

            requiredIds.forEach(id => {
                const element = document.getElementById(id);
                if (!element) {
                    console.error(`HTML element with ID '${id}' not found! Game may not function correctly.`);
                    allElementsExist = false;
                    missingElements.push(id);
                }
            });

            if (allElementsExist) {
                criarMenu();
                lastFrameTime = performance.now();
                requestAnimationFrame(gameLoop);
            } else {
                mostrarMsg(`Critical Error: Not all required HTML elements for the game were found. Check console for details.`);
            }
        });

        console.log("Script loaded and parsed successfully.");