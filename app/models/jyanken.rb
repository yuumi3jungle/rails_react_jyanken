class Jyanken < ActiveRecord::Base
  GUU    = 0
  CHYOKI = 1
  PAA    = 2
  TE = {GUU =>"グー", CHYOKI => "チョキ", PAA => "パー"}

  DRAW = 0
  WIN  = 1
  LOSS = 2
  JUDGMENT = {DRAW => "引き分け", WIN => "人の勝ち", LOSS => "人の負け"}

  before_save :fight

  def judge(human, computer)
    if human == computer
      DRAW
    elsif human < computer || human == PAA && computer == CHYOKI
      WIN
    else
      LOSS
    end
  end

  def fight
    self.computer = rand(3)
    self.judgment = judge(human, computer)
  end

  def self.status
    Jyanken.group(:judgment).count(:judgment)
  end

end
