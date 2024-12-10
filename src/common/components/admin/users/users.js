
                function calculateSleepQuality(sleepDuration, sleepLatency, awakenings) {
                                      let score = 0;
                                                          if (sleepDuration >= 7) {
                                                                                    score += 20;
                                                          }
                                                                              if (sleepLatency <= 30) {
                                                                                                        score += 20;
                                                                              }
                                                                                                  if (awakenings <= 1) {
                                                                                                                            score += 20;
                                                                                                  }
                                                                                                                      return score;
                                                                                                }
                                                                                                            
                                                                                                
                                                                                                  }
                                                                              }
                                                          }
                }